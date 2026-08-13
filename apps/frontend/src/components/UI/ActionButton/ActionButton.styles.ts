import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ActionButtonRoot = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'variantColor',
})<{ variantColor?: 'default' | 'primary' }>(({ theme, variantColor }) => ({
    backgroundColor:
        variantColor === 'primary' ? theme.palette.primary.main : theme.palette.action.hover,
    color:
        variantColor === 'primary'
            ? theme.palette.primary.contrastText
            : theme.palette.text.secondary,
    '&:hover': {
        backgroundColor:
            variantColor === 'primary' ? theme.palette.primary.dark : theme.palette.action.selected,
    },
}));