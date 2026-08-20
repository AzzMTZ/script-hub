import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { UsersProvider } from './providers/UsersProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ColorModeProvider } from './providers/ColorModeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

// The backend authenticates requests via an httpOnly session cookie, so every request
// (including cross-origin ones in local dev, where the frontend and API run on different
// ports) needs to send it along.
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ColorModeProvider>
                <AuthProvider>
                    <UsersProvider>
                        <App />
                    </UsersProvider>
                </AuthProvider>
            </ColorModeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
