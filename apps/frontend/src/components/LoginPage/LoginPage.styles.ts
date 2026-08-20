import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Typography } from '@mui/material';

export const LoginRoot = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
}));

export const LoginCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 380,
    padding: theme.spacing(5, 4),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
}));

export const LoginStack = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing(3),
}));

export const BrandLogo = styled('img')({
    height: 64,
    width: 'auto',
});

export const LoginSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));
