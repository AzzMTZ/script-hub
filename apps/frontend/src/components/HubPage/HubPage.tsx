import { useContext, type MouseEvent } from 'react';
import { Button, Tab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import darkLogo from '../../assets/dark_logo.svg';
import lightLogo from '../../assets/light_logo.svg';
import { ColorModeContext } from '../../contexts/ColorModeContext';
import {
    AddFab,
    BrandLogo,
    BrandStack,
    ColorModeFab,
    HeaderToolbar,
    PageContainer,
    PageHeader,
    PageRoot,
    PageTitle,
    StyledAppBar,
    StyledTabs,
    UserStack,
} from './HubPage.styles';
import { tabMeta } from './HubPage.consts';
import { tabs } from './HubPage.consts';
import { useRocketEasterEgg } from './RocketEasterEgg/RocketEasterEgg';

const HubPage = () => {
    const { pathname } = useLocation();
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const { registerClick, rocket } = useRocketEasterEgg();
    const logo = mode === 'dark' ? darkLogo : lightLogo;
    const activeTabIndex = tabs.findIndex((tab) => pathname.startsWith(tab.path));
    const activeTabKey = activeTabIndex === -1 ? 'scripts' : tabs[activeTabIndex].key;
    const activeMeta = tabMeta[activeTabKey];

    return (
        <PageRoot>
            <StyledAppBar position="sticky" color="transparent" elevation={0}>
                <HeaderToolbar>
                    <BrandStack>
                        <BrandLogo src={logo} alt="ScriptHub" onClick={registerClick} />
                    </BrandStack>
                    <UserStack>
                        <Typography variant="body2" color="text.secondary">
                            Hello, John Doe!
                        </Typography>
                        <Button variant="outlined" size="small">
                            Sign Out
                        </Button>
                    </UserStack>
                </HeaderToolbar>
                <StyledTabs value={activeTabIndex === -1 ? 0 : activeTabIndex}>
                    {tabs.map((tab) => (
                        <Tab key={tab.key} label={tab.label} component={RouterLink} to={tab.path} />
                    ))}
                </StyledTabs>
            </StyledAppBar>

            <PageContainer maxWidth="lg">
                <PageHeader>
                    <PageTitle variant="h5">{activeMeta.label}</PageTitle>
                    <Typography variant="body2" color="text.secondary">
                        {activeMeta.subtitle}
                    </Typography>
                </PageHeader>
                <Outlet />
            </PageContainer>

            <AddFab color="primary" aria-label="add">
                <AddIcon />
            </AddFab>

            <ColorModeFab
                color="default"
                aria-label={mode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    toggleColorMode({ x: event.clientX, y: event.clientY })
                }
            >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </ColorModeFab>

            {rocket}
        </PageRoot>
    );
};

export default HubPage;
