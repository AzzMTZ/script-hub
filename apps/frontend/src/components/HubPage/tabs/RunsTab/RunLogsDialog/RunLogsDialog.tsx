import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Terminal from '../../../../UI/Terminal/Terminal';
import type { Run } from '@script-hub/types';
import { buildDummyLogs } from './RunLogsDialog.utils';

interface RunLogsDialogProps {
    open: boolean;
    title: string;
    run: Run | null;
    scriptName?: string;
    executorName?: string;
    onClose: () => void;
}

const RunLogsDialog = ({ open, title, run, scriptName, executorName, onClose }: RunLogsDialogProps) => {
    if (!run) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle
                component="div"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {title} - Logs
                <IconButton aria-label="close logs viewer" onClick={onClose} edge="end">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: '70vh', p: 0, borderTop: 1, borderColor: 'divider' }}>
                <Terminal lines={buildDummyLogs(run, scriptName, executorName)} />
            </DialogContent>
        </Dialog>
    );
};

export default RunLogsDialog;
