import { Controller, Get, Logger, Post, Query, Req, Res } from '@nestjs/common';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { parseCookies } from './cookie.util';
import {
    OAUTH_STATE_COOKIE_NAME,
    OAUTH_STATE_MAX_AGE_SECONDS,
    SESSION_COOKIE_NAME,
    SESSION_MAX_AGE_SECONDS,
} from './auth.constants';
import type { User } from '../generated/prisma/client';

const getFrontendUrl = (): string => process.env.FRONTEND_URL ?? 'http://localhost:5173';

const isProduction = (): boolean => process.env.NODE_ENV === 'production';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Get('google')
    googleLogin(@Res() res: Response): void {
        const state = randomBytes(16).toString('hex');

        res.cookie(OAUTH_STATE_COOKIE_NAME, state, {
            httpOnly: true,
            sameSite: 'lax',
            secure: isProduction(),
            maxAge: OAUTH_STATE_MAX_AGE_SECONDS * 1000,
        });

        res.redirect(this.authService.buildGoogleAuthUrl(state));
    }

    @Public()
    @Get('google/callback')
    async googleCallback(
        @Query('code') code: string | undefined,
        @Query('state') state: string | undefined,
        @Query('error') error: string | undefined,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        const frontendUrl = getFrontendUrl();
        const cookies = parseCookies(req.headers.cookie);
        res.clearCookie(OAUTH_STATE_COOKIE_NAME);

        const expectedState = cookies[OAUTH_STATE_COOKIE_NAME];
        const stateIsValid = Boolean(state) && Boolean(expectedState) && state === expectedState;

        if (error || !code || !stateIsValid) {
            this.logger.warn(
                `Google OAuth callback rejected (error=${error ?? 'none'}, validState=${stateIsValid})`,
            );
            res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
            return;
        }

        try {
            const user = await this.authService.completeGoogleLogin(code);
            const token = this.authService.issueSessionToken(user);

            res.cookie(SESSION_COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: isProduction(),
                maxAge: SESSION_MAX_AGE_SECONDS * 1000,
            });

            res.redirect(frontendUrl);
        } catch (err) {
            this.logger.error(
                'Google OAuth callback failed',
                err instanceof Error ? err.stack : err,
            );
            res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
        }
    }

    @Get('me')
    me(@CurrentUser() user: User): User {
        return user;
    }

    @Public()
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response): { success: true } {
        res.clearCookie(SESSION_COOKIE_NAME);
        return { success: true };
    }
}
