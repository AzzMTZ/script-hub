import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

export type ColorModeContextValue = {
    mode: PaletteMode;
    toggleColorMode: (origin?: { x: number; y: number }) => void;
};

export const ColorModeContext = createContext<ColorModeContextValue>({
    mode: 'light',
    toggleColorMode: () => {},
});
