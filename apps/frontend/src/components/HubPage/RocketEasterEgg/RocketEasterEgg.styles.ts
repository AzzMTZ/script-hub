import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const launch = keyframes`
    0% {
        bottom: -10%;
        left: 50%;
        transform: translateX(-50%) rotate(45deg) scale(0.8);
        opacity: 1;
    }
    100% {
        bottom: 110%;
        left: 90%;
        transform: translateX(-50%) rotate(45deg) scale(1.4);
        opacity: 0;
    }
`;

export const RocketIcon = styled(RocketLaunchIcon)(({ theme }) => ({
    position: 'fixed',
    fontSize: 48,
    color: theme.palette.primary.main,
    pointerEvents: 'none',
    zIndex: theme.zIndex.tooltip + 1,
    animation: `${launch} 1.2s ease-in forwards`,
}));
