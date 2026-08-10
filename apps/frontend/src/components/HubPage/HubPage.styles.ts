import { styled } from '@mui/material/styles';
import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Fab,
    IconButton,
    Stack,
    Tabs,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';

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
    paddingTop: 15,
    width: 'auto',
    display: 'block',
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

export const AddFab = styled(Fab)({
    position: 'fixed',
    bottom: 32,
    right: 32,
});
