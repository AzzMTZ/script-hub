import { signSessionToken, verifySessionToken } from './jwt.util';

const payload = { sub: 'user-1', email: 'a@example.com', name: 'A B', role: 'runner' };

describe('jwt.util', () => {
    it('verifies a token it just signed', () => {
        const token = signSessionToken(payload, 60);
        const decoded = verifySessionToken(token);

        expect(decoded).not.toBeNull();
        expect(decoded?.sub).toBe(payload.sub);
        expect(decoded?.email).toBe(payload.email);
        expect(decoded?.name).toBe(payload.name);
        expect(decoded?.role).toBe(payload.role);
    });

    it('rejects an expired token', () => {
        const token = signSessionToken(payload, -10);

        expect(verifySessionToken(token)).toBeNull();
    });

    it('rejects a token with a tampered payload', () => {
        const token = signSessionToken(payload, 60);
        const [header, , signature] = token.split('.');
        const tamperedPayload = Buffer.from(
            JSON.stringify({ ...payload, role: 'developer', exp: 9999999999 }),
        ).toString('base64url');

        expect(verifySessionToken(`${header}.${tamperedPayload}.${signature}`)).toBeNull();
    });

    it('rejects a malformed token', () => {
        expect(verifySessionToken('not-a-jwt')).toBeNull();
        expect(verifySessionToken('a.b')).toBeNull();
        expect(verifySessionToken('')).toBeNull();
    });
});
