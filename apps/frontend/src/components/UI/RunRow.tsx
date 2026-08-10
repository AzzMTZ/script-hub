import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {
    InlineActionsStack,
    RunAvatar,
    RunCardContent,
    RunTextBox,
    StyledRunCard,
    TimestampText,
} from '../HubPage/HubPage.styles';
import ActionButton from './ActionButton';

interface RunRecord {
    scriptName: string;
    user: string;
    timestamp: string;
}

interface RunRowProps {
    run: RunRecord;
}

const RunRow = ({ run }: RunRowProps) => {
    return (
        <StyledRunCard variant="outlined">
            <RunCardContent>
                <RunAvatar>
                    <HistoryIcon fontSize="small" />
                </RunAvatar>
                <RunTextBox>
                    <Typography variant="subtitle2" noWrap>
                        &quot;{run.scriptName}&quot;
                        <Typography component="span" variant="body2" color="text.secondary">
                            {' '}
                            &middot; run by {run.user}
                        </Typography>
                    </Typography>
                    <TimestampText variant="caption" color="text.secondary">
                        {run.timestamp}
                    </TimestampText>
                </RunTextBox>
                <InlineActionsStack>
                    <ActionButton label="info">
                        <InfoOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="view logs">
                        <ReceiptLongIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="cancel run">
                        <CloseIcon fontSize="small" />
                    </ActionButton>
                </InlineActionsStack>
            </RunCardContent>
        </StyledRunCard>
    );
};

export default RunRow;
