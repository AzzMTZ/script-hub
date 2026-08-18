import { useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from '../contexts/ColorModeContext';
import { getTheme } from '../consts/theme';

const STORAGE_KEY = 'colorMode';
const WAVE_DURATION_MS = 550;

const getInitialMode = (): PaletteMode => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<PaletteMode>(getInitialMode);

    const colorModeValue = useMemo(
        () => ({
            mode,
            toggleColorMode: (origin?: { x: number; y: number }) => {
                const applyModeChange = () => {
                    setMode((prevMode) => {
                        const nextMode = prevMode === 'light' ? 'dark' : 'light';
                        localStorage.setItem(STORAGE_KEY, nextMode);

                        return nextMode;
                    });
                };

                if (!origin || !document.startViewTransition) {
                    applyModeChange();
                    return;
                }

                const { x, y } = origin;
                const endRadius = Math.hypot(
                    Math.max(x, window.innerWidth - x),
                    Math.max(y, window.innerHeight - y),
                );

                const transition = document.startViewTransition(() => {
                    flushSync(applyModeChange);
                });

                transition.ready
                    .then(() => {
                        document.documentElement.animate(
                            {
                                clipPath: [
                                    `circle(0px at ${x}px ${y}px)`,
                                    `circle(${endRadius}px at ${x}px ${y}px)`,
                                ],
                            },
                            {
                                duration: WAVE_DURATION_MS,
                                easing: 'ease-in-out',
                                pseudoElement: '::view-transition-new(root)',
                            },
                        );
                    })
                    .catch(() => {});
            },
        }),
        [mode],
    );

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorModeValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
