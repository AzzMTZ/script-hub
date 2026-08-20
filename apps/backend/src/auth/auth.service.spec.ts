import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import type { User } from '../generated/prisma/client';

const googleTokenResponse = {
    access_token: 'google-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'openid email profile',
};

const googleProfile = {
    sub: 'google-user-123',
    email: 'jane@example.com',
    email_verified: true,
    name: 'Jane Doe',
};

const jsonResponse = (body: unknown, ok = true, status = 200) =>
    Promise.resolve({
        ok,
        status,
        json: () => Promise.resolve(body),
        text: () => Promise.resolve(JSON.stringify(body)),
    } as Response);

const makeUser = (overrides: Partial<User> = {}): User =>
    ({
        id: 'user-1',
        authProvider: 'google',
        authProviderId: googleProfile.sub,
        name: googleProfile.name,
        email: googleProfile.email,
        role: 'runner',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    }) as User;

describe('AuthService', () => {
    let service: AuthService;
    let usersService: {
        findByAuthProvider: jest.Mock;
        createUser: jest.Mock;
        editUser: jest.Mock;
        getUserById: jest.Mock;
    };
    let fetchSpy: jest.SpyInstance;

    beforeEach(async () => {
        process.env.GOOGLE_CLIENT_ID = 'client-id';
        process.env.GOOGLE_CLIENT_SECRET = 'client-secret';
        process.env.GOOGLE_CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

        usersService = {
            findByAuthProvider: jest.fn(),
            createUser: jest.fn(),
            editUser: jest.fn(),
            getUserById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, { provide: UsersService, useValue: usersService }],
        }).compile();

        service = module.get<AuthService>(AuthService);

        fetchSpy = jest
            .spyOn(global, 'fetch')
            .mockImplementationOnce(() => jsonResponse(googleTokenResponse))
            .mockImplementationOnce(() => jsonResponse(googleProfile));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('buildGoogleAuthUrl', () => {
        it('includes the client id, callback url and state', () => {
            const url = new URL(service.buildGoogleAuthUrl('some-state'));

            expect(url.searchParams.get('client_id')).toBe('client-id');
            expect(url.searchParams.get('redirect_uri')).toBe(
                'http://localhost:3000/auth/google/callback',
            );
            expect(url.searchParams.get('state')).toBe('some-state');
            expect(url.searchParams.get('response_type')).toBe('code');
        });
    });

    describe('completeGoogleLogin', () => {
        it('creates a new user when none exists for the Google account', async () => {
            usersService.findByAuthProvider.mockResolvedValue(null);
            const created = makeUser();
            usersService.createUser.mockResolvedValue(created);

            const result = await service.completeGoogleLogin('auth-code');

            expect(fetchSpy).toHaveBeenCalledTimes(2);
            expect(usersService.findByAuthProvider).toHaveBeenCalledWith(
                'google',
                googleProfile.sub,
            );
            expect(usersService.createUser).toHaveBeenCalledWith({
                authProvider: 'google',
                authProviderId: googleProfile.sub,
                email: googleProfile.email,
                name: googleProfile.name,
                role: 'runner',
            });
            expect(result).toBe(created);
        });

        it('returns the existing user unchanged when the profile matches', async () => {
            const existing = makeUser();
            usersService.findByAuthProvider.mockResolvedValue(existing);

            const result = await service.completeGoogleLogin('auth-code');

            expect(usersService.createUser).not.toHaveBeenCalled();
            expect(usersService.editUser).not.toHaveBeenCalled();
            expect(result).toBe(existing);
        });

        it('updates the existing user when their Google name/email changed', async () => {
            const existing = makeUser({ name: 'Old Name', email: 'old@example.com' });
            usersService.findByAuthProvider.mockResolvedValue(existing);
            const updated = makeUser();
            usersService.editUser.mockResolvedValue(updated);

            const result = await service.completeGoogleLogin('auth-code');

            expect(usersService.editUser).toHaveBeenCalledWith(existing.id, {
                authProvider: 'google',
                authProviderId: googleProfile.sub,
                email: googleProfile.email,
                name: googleProfile.name,
                role: existing.role,
            });
            expect(result).toBe(updated);
        });

        it('throws when the token exchange fails', async () => {
            fetchSpy.mockReset();
            fetchSpy.mockImplementationOnce(() =>
                jsonResponse({ error: 'invalid_grant' }, false, 400),
            );

            await expect(service.completeGoogleLogin('bad-code')).rejects.toBeInstanceOf(
                UnauthorizedException,
            );
        });
    });

    describe('session tokens', () => {
        it('round-trips a token through getUserFromSessionToken', async () => {
            const user = makeUser();
            const token = service.issueSessionToken(user);
            usersService.getUserById.mockResolvedValue(user);

            const result = await service.getUserFromSessionToken(token);

            expect(usersService.getUserById).toHaveBeenCalledWith(user.id);
            expect(result).toBe(user);
        });

        it('returns null for a garbage token', async () => {
            const result = await service.getUserFromSessionToken('not-a-real-token');

            expect(result).toBeNull();
            expect(usersService.getUserById).not.toHaveBeenCalled();
        });
    });
});
