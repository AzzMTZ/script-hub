import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { User } from '../generated/prisma/client';
import { signSessionToken, verifySessionToken, type SessionPayload } from './jwt.util';
import { SESSION_MAX_AGE_SECONDS } from './auth.constants';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

type GoogleTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    id_token?: string;
    scope: string;
};

type GoogleUserInfo = {
    sub: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
    picture?: string;
};

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly usersService: UsersService) {}

    private getClientId(): string {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        if (!clientId) {
            throw new Error('GOOGLE_CLIENT_ID is not configured');
        }
        return clientId;
    }

    private getClientSecret(): string {
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        if (!clientSecret) {
            throw new Error('GOOGLE_CLIENT_SECRET is not configured');
        }
        return clientSecret;
    }

    private getCallbackUrl(): string {
        return process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:3000/auth/google/callback';
    }

    /** Builds the URL the browser is redirected to in order to start the Google consent flow. */
    buildGoogleAuthUrl(state: string): string {
        const params = new URLSearchParams({
            client_id: this.getClientId(),
            redirect_uri: this.getCallbackUrl(),
            response_type: 'code',
            scope: 'openid email profile',
            state,
            access_type: 'online',
            prompt: 'select_account',
        });

        return `${GOOGLE_AUTH_URL}?${params.toString()}`;
    }

    /**
     * Exchanges the authorization code Google sent to our callback for tokens, fetches the
     * Google profile, and finds or creates the matching ScriptHub user.
     */
    async completeGoogleLogin(code: string): Promise<User> {
        const tokens = await this.exchangeCodeForTokens(code);
        const profile = await this.fetchGoogleProfile(tokens.access_token);

        if (!profile.email) {
            throw new UnauthorizedException('Google account has no email address');
        }

        return this.findOrCreateUser({
            sub: profile.sub,
            email: profile.email,
            name: profile.name ?? profile.email,
        });
    }

    private async exchangeCodeForTokens(code: string): Promise<GoogleTokenResponse> {
        const response = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: this.getClientId(),
                client_secret: this.getClientSecret(),
                redirect_uri: this.getCallbackUrl(),
                grant_type: 'authorization_code',
            }).toString(),
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            this.logger.error(`Google token exchange failed (${response.status}): ${body}`);
            throw new UnauthorizedException('Failed to authenticate with Google');
        }

        return (await response.json()) as GoogleTokenResponse;
    }

    private async fetchGoogleProfile(accessToken: string): Promise<GoogleUserInfo> {
        const response = await fetch(GOOGLE_USERINFO_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            this.logger.error(`Fetching Google profile failed (${response.status}): ${body}`);
            throw new UnauthorizedException('Failed to authenticate with Google');
        }

        return (await response.json()) as GoogleUserInfo;
    }

    private async findOrCreateUser(profile: {
        sub: string;
        email: string;
        name: string;
    }): Promise<User> {
        const existing = await this.usersService.findByAuthProvider('google', profile.sub);

        if (existing) {
            if (existing.email !== profile.email || existing.name !== profile.name) {
                return this.usersService.editUser(existing.id, {
                    authProvider: 'google',
                    authProviderId: profile.sub,
                    email: profile.email,
                    name: profile.name,
                    role: existing.role,
                });
            }

            return existing;
        }

        // New Google sign-ins default to the least-privileged role. Promoting a user to
        // "developer" is done separately (e.g. via PUT /users/:id) - role/permission
        // enforcement itself is out of scope until V3 per the roadmap.
        return this.usersService.createUser({
            authProvider: 'google',
            authProviderId: profile.sub,
            email: profile.email,
            name: profile.name,
            role: 'runner',
        });
    }

    issueSessionToken(user: User): string {
        const payload: SessionPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        return signSessionToken(payload, SESSION_MAX_AGE_SECONDS);
    }

    async getUserFromSessionToken(token: string): Promise<User | null> {
        const payload = verifySessionToken(token);
        if (!payload) return null;

        return this.usersService.getUserById(payload.sub);
    }
}
