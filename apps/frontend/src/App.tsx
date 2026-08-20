import { useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HubPage from './components/HubPage/HubPage';
import LoginPage from './components/LoginPage/LoginPage';
import ConfigTab from './components/HubPage/tabs/ConfigTab/ConfigTab';
import RunsTab from './components/HubPage/tabs/RunsTab/RunsTab';
import ScriptsTab from './components/HubPage/tabs/ScriptsTab/ScriptsTab';
import { AuthContext } from './contexts/AuthContext';
import { ConfigItemsProvider } from './providers/ConfigItemsProvider';
import { ScriptsProvider } from './providers/ScriptsProvider';

const FullPageLoader = () => (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <CircularProgress />
    </Box>
);

const App = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
                />
                <Route
                    path="/"
                    element={isAuthenticated ? <HubPage /> : <Navigate to="/login" replace />}
                >
                    <Route index element={<Navigate to="/scripts" replace />} />
                    <Route
                        path="scripts"
                        element={
                            <ConfigItemsProvider>
                                <ScriptsProvider>
                                    <ScriptsTab />
                                </ScriptsProvider>
                            </ConfigItemsProvider>
                        }
                    />
                    <Route
                        path="config"
                        element={
                            <ConfigItemsProvider>
                                <ConfigTab />
                            </ConfigItemsProvider>
                        }
                    />
                    <Route
                        path="runs"
                        element={
                            <ScriptsProvider>
                                <RunsTab />
                            </ScriptsProvider>
                        }
                    />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? '/scripts' : '/login'} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
