import { createTheme, type PaletteMode } from '@mui/material/styles';

const palettesByMode: Record<PaletteMode, Record<string, unknown>> = {
    light: {
        mode: 'light',
        primary: {
            main: '#dc2626',
            dark: '#b91c1c',
            light: '#f87171',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ef4444',
        },
        background: {
            default: '#f6f7fb',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e1b2e',
            secondary: '#6b7280',
        },
        divider: 'rgba(15, 23, 42, 0.08)',
    },
    dark: {
        mode: 'dark',
        primary: {
            main: '#f87171',
            dark: '#ef4444',
            light: '#fca5a5',
            contrastText: '#1e1b2e',
        },
        secondary: {
            main: '#f87171',
        },
        background: {
            default: '#111119',
            paper: '#1a1a24',
        },
        text: {
            primary: '#f3f4f6',
            secondary: '#9ca3af',
        },
        divider: 'rgba(255, 255, 255, 0.08)',
    },
};

export const getTheme = (mode: PaletteMode) => {
    const isLight = mode === 'light';

    return createTheme({
        palette: palettesByMode[mode],
        shape: {
            borderRadius: 12,
        },
        typography: {
            fontFamily: [
                'Inter',
                'system-ui',
                '-apple-system',
                'Segoe UI',
                'Roboto',
                'sans-serif',
            ].join(','),
            h6: {
                fontWeight: 700,
            },
            subtitle1: {
                fontWeight: 600,
            },
            button: {
                fontWeight: 600,
                textTransform: 'none',
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? 'rgba(255, 255, 255, 0.85)'
                            : 'rgba(26, 26, 36, 0.85)',
                        backdropFilter: 'blur(8px)',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                        minHeight: 48,
                    },
                },
            },
            MuiFab: {
                styleOverrides: {
                    root: {
                        boxShadow: isLight
                            ? '0 8px 24px rgba(220, 38, 38, 0.35)'
                            : '0 8px 24px rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        },
    });
};
