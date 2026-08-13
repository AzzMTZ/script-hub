import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UsersProvider } from './providers/UsersProvider';
import { ColorModeProvider } from './providers/ColorModeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ColorModeProvider>
                <UsersProvider>
                    <App />
                </UsersProvider>
            </ColorModeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
