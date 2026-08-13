import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InlineActionsStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
}));

export const StyledRunCard = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.divider,
    '&:hover': {
        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
        borderColor: 'transparent',
    },
}));

export const RunCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const RunAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
}));

export const RunTextBox = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
});

export const TimestampText = styled(Typography)({
    fontFamily: 'monospace',
});