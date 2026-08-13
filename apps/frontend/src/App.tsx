import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HubPage from './components/HubPage/HubPage';
import ConfigTab from './components/HubPage/tabs/ConfigTab/ConfigTab';
import RunsTab from './components/HubPage/tabs/RunsTab/RunsTab';
import ScriptsTab from './components/HubPage/tabs/ScriptsTab/ScriptsTab';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HubPage />}>
                    <Route index element={<Navigate to="/scripts" replace />} />
                    <Route path="scripts" element={<ScriptsTab />} />
                    <Route path="config" element={<ConfigTab />} />
                    <Route path="runs" element={<RunsTab />} />
                </Route>
                <Route path="*" element={<Navigate to="/scripts" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
