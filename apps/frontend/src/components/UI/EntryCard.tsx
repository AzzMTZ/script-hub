import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import {
    ActionsStack,
    ClampedDescription,
    EntryAvatar,
    EntryCardContent,
    EntryHeaderStack,
    StyledEntryCard,
} from '../HubPage/HubPage.styles';

interface EntryCardProps {
    name: string;
    description: string;
    actions: ReactNode;
}

const EntryCard = ({ name, description, actions }: EntryCardProps) => {
    return (
        <StyledEntryCard variant="outlined">
            <EntryCardContent>
                <EntryHeaderStack>
                    <EntryAvatar variant="rounded">
                        <TerminalIcon fontSize="small" />
                    </EntryAvatar>
                    <Typography variant="subtitle1" component="h3">
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
