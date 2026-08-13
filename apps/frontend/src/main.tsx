import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UsersProvider } from './providers/UsersProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './consts/theme.ts';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <UsersProvider>
                    <App />
                </UsersProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
