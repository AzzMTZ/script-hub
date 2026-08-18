import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { ActionButtonRoot } from './ActionButton.styles';

interface ActionButtonProps {
    label: string;
    color?: 'default' | 'primary';
    onClick?: () => void;
    children: ReactNode;
    sx?: SxProps<Theme>;
}

const ActionButton = ({ label, color = 'default', onClick, children, sx }: ActionButtonProps) => {
    return (
        <ActionButtonRoot
            size="small"
            aria-label={label}
            onClick={onClick}
            variantColor={color}
            sx={sx}
        >
            {children}
        </ActionButtonRoot>
    );
};

export default ActionButton;