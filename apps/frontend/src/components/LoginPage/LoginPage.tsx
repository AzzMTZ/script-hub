import { useContext } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import darkLogo from '../../assets/dark_logo.svg';
import lightLogo from '../../assets/light_logo.svg';
import { ColorModeContext } from '../../contexts/ColorModeContext';
import { getGoogleSignInUrl } from '../../apis/authApi';
import { BrandLogo, LoginCard, LoginRoot, LoginStack, LoginSubtitle } from './LoginPage.styles';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
            fill="#4285F4"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"
        />
        <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
        />
        <path
            fill="#FBBC05"
            d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
        />
        <path
            fill="#EA4335"
            d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
        />
    </svg>
);

const LoginPage = () => {
    const { mode } = useContext(ColorModeContext);
    const logo = mode === 'dark' ? darkLogo : lightLogo;
    const [searchParams] = useSearchParams();
    const hasAuthError = searchParams.get('error') === 'google_auth_failed';

    return (
        <LoginRoot>
            <LoginCard>
                <LoginStack>
                    <BrandLogo src={logo} alt="ScriptHub" />
                    <Typography variant="h6">Welcome to ScriptHub</Typography>
                    <LoginSubtitle variant="body2">
                        Sign in with your Google account to manage and run scripts.
                    </LoginSubtitle>
                    {hasAuthError && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Google sign-in failed. Please try again.
                        </Alert>
                    )}
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<GoogleIcon />}
                        href={getGoogleSignInUrl()}
                    >
                        Sign in with Google
                    </Button>
                </LoginStack>
            </LoginCard>
        </LoginRoot>
    );
};

export default LoginPage;
