import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from '../../generated/prisma/client';

export type AuthenticatedRequest = Request & { user: User };

// Reads the User that JwtAuthGuard attached to the request. Only meaningful on routes
// that are protected (i.e. not marked with @Public()).
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
});
