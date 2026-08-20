import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// Marks a route (or an entire controller) as not requiring authentication.
// Everything else is protected by default via the global JwtAuthGuard.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
