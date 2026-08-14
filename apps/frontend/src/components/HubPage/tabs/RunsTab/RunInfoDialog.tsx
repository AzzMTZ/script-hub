import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import InfoDialog from '../../../UI/InfoDialog/InfoDialog';
import type { Run } from '@script-hub/types';

interface RunInfoDialogProps {
    open: boolean;
    title: string;
    run: Run | null;
    scriptName?: string;
    executorName?: string;
    onClose: () => void;
}

const RunInfoDialog = ({
    open,
    title,
    run,
    scriptName,
    executorName,
    onClose,
}: RunInfoDialogProps) => {
    if (!run) {
        return null;
    }

    const paramsEntries = Object.entries(run.params ?? {});

    return (
        <InfoDialog
            open={open}
            title={`${title} - Info`}
            metadataRows={[
                { label: 'Script', value: scriptName ?? run.scriptId },
                { label: 'Run ID', value: run.id },
                { label: 'Executor', value: executorName ?? run.executorId },
                { label: 'Status', value: run.status ?? 'pending' },
                { label: 'Started at', value: new Date(run.startedAt).toLocaleString() },
                {
                    label: 'Finished at',
                    value: run.finishedAt
                        ? new Date(run.finishedAt).toLocaleString()
                        : 'Not finished yet',
                },
                { label: 'Created at', value: new Date(run.createdAt).toLocaleString() },
                { label: 'Updated at', value: new Date(run.updatedAt).toLocaleString() },
            ]}
            sections={[
                {
                    title: 'Parameters',
                    content:
                        paramsEntries.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                No parameters passed
                            </Typography>
                        ) : (
                            <Table
                                size="small"
                                aria-label="run parameters table"
                                sx={{ '& tr:last-child td': { border: 0 } }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paramsEntries.map(([name, value]) => (
                                        <TableRow key={name}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>
                                                {typeof value === 'string'
                                                    ? value
                                                    : JSON.stringify(value)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ),
                },
            ]}
            onClose={onClose}
        />
    );
};

export default RunInfoDialog;
