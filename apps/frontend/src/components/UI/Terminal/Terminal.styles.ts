import { Box, type PaletteMode } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TerminalContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode: PaletteMode }>(({ mode }) => ({
    width: '100%',
    height: '100%',
    padding: 8,
    backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
}));
