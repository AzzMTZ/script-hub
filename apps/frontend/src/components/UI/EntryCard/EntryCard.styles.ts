import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const StyledEntryCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'editing',
})<{ editing?: boolean }>(({ theme, editing }) => ({
    position: 'relative',
    width: 272,
    overflow: 'hidden',
    borderColor: editing ? theme.palette.primary.main : theme.palette.divider,
    backgroundColor: editing ? alpha(theme.palette.primary.main, 0.06) : undefined,
    boxShadow: editing ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
    '&:hover': {
        boxShadow: editing
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : '0 12px 24px rgba(15, 23, 42, 0.08)',
        borderColor: editing ? theme.palette.primary.main : 'transparent',
    },
}));

export const EditingSideBar = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 5,
    backgroundColor: theme.palette.primary.main,
}));

export const DeleteActionSlot = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
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