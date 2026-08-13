import { Button, Tab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
    AddFab,
    BrandLogo,
    BrandStack,
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

const HubPage = () => {
    const { pathname } = useLocation();
    const activeTabIndex = tabs.findIndex((tab) => pathname.startsWith(tab.path));
    const activeTabKey = activeTabIndex === -1 ? 'scripts' : tabs[activeTabIndex].key;
    const activeMeta = tabMeta[activeTabKey];

    return (
        <PageRoot>
            <StyledAppBar position="sticky" color="transparent" elevation={0}>
                <HeaderToolbar>
                    <BrandStack>
                        <BrandLogo src={logo} alt="ScriptHub" />
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
        </PageRoot>
    );
};

export default HubPage;
