import { createHmac, timingSafeEqual } from 'crypto';

// A small, dependency-free HS256 JWT implementation. ScriptHub's session tokens don't need
// the full JWT feature set (multiple algorithms, JWKS, etc.), so we avoid pulling in a
// library for this and instead sign/verify with Node's built-in crypto module.

export type SessionPayload = {
    sub: string;
    email: string;
    name: string;
    role: string;
};

export type SessionToken = SessionPayload & {
    iat: number;
    exp: number;
};

const base64UrlEncode = (input: Buffer | string): string =>
    Buffer.from(input).toString('base64url');

const base64UrlDecode = (input: string): Buffer => Buffer.from(input, 'base64url');

const getSecret = (): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.warn(
            'JWT_SECRET is not set - falling back to an insecure development secret. ' +
                'Set JWT_SECRET before deploying to production.',
        );
    }

    return secret ?? 'dev-only-insecure-secret-change-me';
};

export const signSessionToken = (payload: SessionPayload, expiresInSeconds: number): string => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const fullPayload: SessionToken = { ...payload, iat: now, exp: now + expiresInSeconds };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const signature = createHmac('sha256', getSecret()).update(signingInput).digest('base64url');

    return `${signingInput}.${signature}`;
};

export const verifySessionToken = (token: string): SessionToken | null => {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = createHmac('sha256', getSecret())
        .update(signingInput)
        .digest('base64url');

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
        signatureBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
        return null;
    }

    try {
        const payload = JSON.parse(
            base64UrlDecode(encodedPayload).toString('utf8'),
        ) as SessionToken;

        if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
};
