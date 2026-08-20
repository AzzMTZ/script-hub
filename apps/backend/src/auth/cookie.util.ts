// Minimal cookie-header parser so we don't need to depend on (or configure) the
// `cookie-parser` middleware just to read a couple of cookies.
export const parseCookies = (cookieHeader?: string): Record<string, string> => {
    if (!cookieHeader) return {};

    return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
        const separatorIndex = part.indexOf('=');
        if (separatorIndex === -1) return acc;

        const key = part.slice(0, separatorIndex).trim();
        const value = part.slice(separatorIndex + 1).trim();
        if (!key) return acc;

        try {
            acc[key] = decodeURIComponent(value);
        } catch {
            acc[key] = value;
        }

        return acc;
    }, {});
};
