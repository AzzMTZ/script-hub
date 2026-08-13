import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HubPage from './components/HubPage/HubPage';
import ConfigTab from './components/HubPage/tabs/ConfigTab/ConfigTab';
import RunsTab from './components/HubPage/tabs/RunsTab/RunsTab';
import ScriptsTab from './components/HubPage/tabs/ScriptsTab/ScriptsTab';
import { ConfigItemsProvider } from './providers/ConfigItemsProvider';
import { ScriptsProvider } from './providers/ScriptsProvider';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HubPage />}>
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
                <Route path="*" element={<Navigate to="/scripts" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
