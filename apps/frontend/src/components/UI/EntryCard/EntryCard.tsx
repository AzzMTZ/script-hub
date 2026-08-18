import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import {
    ActionsStack,
    ClampedDescription,
    DeleteActionSlot,
    EditingSideBar,
    EntryAvatar,
    EntryCardContent,
    EntryHeaderStack,
    StyledEntryCard,
} from './EntryCard.styles';

interface EntryCardProps {
    name: string;
    description: string;
    actions: ReactNode;
    icon?: ReactNode;
    deleteAction?: ReactNode;
    editing?: boolean;
}

const EntryCard = ({
    name,
    description,
    actions,
    icon,
    deleteAction,
    editing = false,
}: EntryCardProps) => {
    return (
        <StyledEntryCard variant="outlined" editing={editing}>
            {editing && <EditingSideBar />}
            {deleteAction && <DeleteActionSlot>{deleteAction}</DeleteActionSlot>}
            <EntryCardContent>
                <EntryHeaderStack>
                    <EntryAvatar variant="circular">
                        {icon ?? <TerminalIcon fontSize="small" />}
                    </EntryAvatar>
                    <Typography variant="subtitle1" component="h3" noWrap>
                        {name}
                    </Typography>
                </EntryHeaderStack>
                <ClampedDescription variant="body2" color="text.secondary">
                    {description}
                </ClampedDescription>
                <ActionsStack>{actions}</ActionsStack>
            </EntryCardContent>
        </StyledEntryCard>
    );
};

export default EntryCard;