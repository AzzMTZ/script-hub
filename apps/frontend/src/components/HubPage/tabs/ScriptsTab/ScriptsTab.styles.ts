import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SearchField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    '& .MuiOutlinedInput-root': {
        borderRadius: 999,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const CardsGrid = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2.5),
}));