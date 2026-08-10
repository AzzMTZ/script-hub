import type { ReactNode } from 'react';
import { ActionButtonRoot } from '../HubPage/HubPage.styles';

interface ActionButtonProps {
    label: string;
    color?: 'default' | 'primary';
    onClick?: () => void;
    children: ReactNode;
}

const ActionButton = ({ label, color = 'default', onClick, children }: ActionButtonProps) => {
    return (
        <ActionButtonRoot size="small" aria-label={label} onClick={onClick} variantColor={color}>
            {children}
        </ActionButtonRoot>
    );
};

export default ActionButton;
