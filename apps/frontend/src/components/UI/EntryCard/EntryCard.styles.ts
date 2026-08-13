import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledEntryCard = styled(Card)(({ theme }) => ({
    width: 272,
    borderColor: theme.palette.divider,
    '&:hover': {
        boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
        borderColor: 'transparent',
    },
}));

export const EntryCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
}));

export const EntryHeaderStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.25),
}));

export const EntryAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    width: 36,
    height: 36,
}));

export const ClampedDescription = styled(Typography)({
    minHeight: 40,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
});

export const ActionsStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
}));