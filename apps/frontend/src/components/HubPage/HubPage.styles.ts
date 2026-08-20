import { styled } from '@mui/material/styles';
import { AppBar, Box, Container, Fab, Stack, Tabs, Toolbar, Typography } from '@mui/material';

export const PageRoot = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
}));

export const PageContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export const PageTitle = styled(Typography)({
    fontWeight: 700,
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const HeaderToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
});

export const BrandStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.5),
}));

export const BrandLogo = styled('img')({
    height: 100,
    paddingBlock: 10,
    width: 'auto',
    display: 'block',
    cursor: 'pointer',
    userSelect: 'none',
});

export const UserStack = styled(Stack)(({ theme }) => ({
    alignItems: 'flex-end',
    gap: theme.spacing(0.5),
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& .MuiTabs-indicator': {
        height: 3,
        borderRadius: 3,
    },
}));

export const AddFab = styled(Fab)({
    position: 'fixed',
    bottom: 32,
    right: 32,
});

export const ColorModeFab = styled(Fab)({
    position: 'fixed',
    bottom: 32,
    left: 32,
});
