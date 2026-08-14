import { useContext } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { ScriptsContext } from '../../../../../contexts/ScriptsContext';
import { UsersContext } from '../../../../../contexts/UsersContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReplayIcon from '@mui/icons-material/Replay';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ActionButton from '../../../../UI/ActionButton/ActionButton';
import type { Run } from '@script-hub/types';
import {
    InlineActionsStack,
    RunAvatar,
    RunCardContent,
    RunTextBox,
    StyledRunCard,
    TimestampText,
} from './RunRow.styles';

interface RunRowProps {
    run: Run;
    onInfoClick?: (run: Run) => void;
    onLogsClick?: (run: Run) => void;
}

const statusStyles = {
    pending: { label: 'Pending', color: 'warning' as const },
    running: { label: 'Running', color: 'info' as const },
    completed: { label: 'Completed', color: 'success' as const },
    failed: { label: 'Failed', color: 'error' as const },
};

const RunRow = ({ run, onInfoClick, onLogsClick }: RunRowProps) => {
    const { scripts } = useContext(ScriptsContext);
    const { users } = useContext(UsersContext);
    const scriptName = scripts.find((script) => script.id === run.scriptId)?.name ?? run.scriptId;
    const executorName = users.find((user) => user.id === run.executorId)?.name ?? run.executorId;
    const statusKey = run.status ?? 'pending';
    const status = statusStyles[statusKey] ?? statusStyles.pending;
    const isFinished = statusKey === 'completed' || statusKey === 'failed';

    return (
        <StyledRunCard variant="outlined">
            <RunCardContent>
                <RunAvatar>
                    <HistoryIcon fontSize="small" />
                </RunAvatar>
                <RunTextBox>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" noWrap>
                            &quot;{scriptName}&quot;
                            <Typography component="span" variant="body2" color="text.secondary">
                                &middot; run by {executorName}
                            </Typography>
                        </Typography>
                        <Chip
                            label={status.label}
                            color={status.color}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                            color: 'text.secondary',
                        }}
                    >
                        <TimestampText variant="caption">Started {new Date(run.startedAt).toLocaleString()}</TimestampText>
                        {run.finishedAt && (
                            <>
                                <Typography component="span" variant="caption" color="text.secondary">
                                    •
                                </Typography>
                                <TimestampText variant="caption">
                                    Finished {new Date(run.finishedAt).toLocaleString()}
                                </TimestampText>
                            </>
                        )}
                    </Box>
                </RunTextBox>
                <InlineActionsStack>
                    <ActionButton label="info" onClick={() => onInfoClick?.(run)}>
                        <InfoOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="view logs" onClick={() => onLogsClick?.(run)}>
                        <ReceiptLongIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="re-run">
                        <ReplayIcon fontSize="small" />
                    </ActionButton>
                    {isFinished ? (
                        <ActionButton label="delete run">
                            <DeleteOutlineIcon fontSize="small" />
                        </ActionButton>
                    ) : (
                        <ActionButton label="stop run">
                            <StopCircleIcon fontSize="small" />
                        </ActionButton>
                    )}
                </InlineActionsStack>
            </RunCardContent>
        </StyledRunCard>
    );
};

export default RunRow;
