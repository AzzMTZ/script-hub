import { useMemo, useState, type ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from '../contexts/ColorModeContext';
import { getTheme } from '../consts/theme';

const STORAGE_KEY = 'colorMode';

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
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const nextMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem(STORAGE_KEY, nextMode);

                    return nextMode;
                });
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
