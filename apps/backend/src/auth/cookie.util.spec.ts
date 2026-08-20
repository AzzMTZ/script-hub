import { parseCookies } from './cookie.util';

describe('parseCookies', () => {
    it('returns an empty object for an undefined or empty header', () => {
        expect(parseCookies(undefined)).toEqual({});
        expect(parseCookies('')).toEqual({});
    });

    it('parses multiple cookies', () => {
        expect(parseCookies('access_token=abc123; oauth_state=xyz')).toEqual({
            access_token: 'abc123',
            oauth_state: 'xyz',
        });
    });

    it('URL-decodes cookie values', () => {
        expect(parseCookies('foo=bar%20baz')).toEqual({ foo: 'bar baz' });
    });

    it('skips malformed entries without a value', () => {
        expect(parseCookies('a=1;malformed;b=2')).toEqual({ a: '1', b: '2' });
    });
});
