import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from '../auth.service';
import { SESSION_COOKIE_NAME } from '../auth.constants';
import type { User } from '../../generated/prisma/client';

const makeContext = (cookieHeader?: string): { context: ExecutionContext; request: any } => {
    const request: any = { headers: { cookie: cookieHeader } };

    const context = {
        getHandler: () => ({}),
        getClass: () => ({}),
        switchToHttp: () => ({
            getRequest: () => request,
        }),
    } as unknown as ExecutionContext;

    return { context, request };
};

describe('JwtAuthGuard', () => {
    let reflector: { getAllAndOverride: jest.Mock };
    let authService: { getUserFromSessionToken: jest.Mock };
    let guard: JwtAuthGuard;

    beforeEach(() => {
        reflector = { getAllAndOverride: jest.fn() };
        authService = { getUserFromSessionToken: jest.fn() };
        guard = new JwtAuthGuard(
            reflector as unknown as Reflector,
            authService as unknown as AuthService,
        );
    });

    it('allows @Public() routes through without checking a session', async () => {
        reflector.getAllAndOverride.mockReturnValue(true);
        const { context } = makeContext(undefined);

        await expect(guard.canActivate(context)).resolves.toBe(true);
        expect(authService.getUserFromSessionToken).not.toHaveBeenCalled();
    });

    it('rejects requests with no session cookie', async () => {
        reflector.getAllAndOverride.mockReturnValue(false);
        const { context } = makeContext(undefined);

        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects requests with an invalid or expired session', async () => {
        reflector.getAllAndOverride.mockReturnValue(false);
        authService.getUserFromSessionToken.mockResolvedValue(null);
        const { context } = makeContext(`${SESSION_COOKIE_NAME}=bad-token`);

        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('attaches the resolved user to the request and allows access', async () => {
        reflector.getAllAndOverride.mockReturnValue(false);
        const user = {
            id: 'user-1',
            name: 'Jane',
            email: 'jane@example.com',
            role: 'runner',
        } as User;
        authService.getUserFromSessionToken.mockResolvedValue(user);
        const { context, request } = makeContext(`${SESSION_COOKIE_NAME}=good-token`);

        await expect(guard.canActivate(context)).resolves.toBe(true);
        expect(request.user).toBe(user);
        expect(authService.getUserFromSessionToken).toHaveBeenCalledWith('good-token');
    });
});
