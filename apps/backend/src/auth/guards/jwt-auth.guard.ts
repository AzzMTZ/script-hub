import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { AuthService } from '../auth.service';
import { parseCookies } from '../cookie.util';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { SESSION_COOKIE_NAME } from '../auth.constants';
import type { AuthenticatedRequest } from '../decorators/current-user.decorator';

// Registered globally (see AppModule) so every route requires a valid session by default.
// Routes/controllers annotated with @Public() (Google's own endpoints, health checks, ...)
// skip the check.
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<Request>();
        const token = parseCookies(request.headers.cookie)[SESSION_COOKIE_NAME];

        if (!token) {
            throw new UnauthorizedException('Not authenticated');
        }

        const user = await this.authService.getUserFromSessionToken(token);
        if (!user) {
            throw new UnauthorizedException('Invalid or expired session');
        }

        (request as AuthenticatedRequest).user = user;
        return true;
    }
}
