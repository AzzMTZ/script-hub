import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import type { ScriptParam } from '@script-hub/types';

interface ScriptInfoDialogProps {
    open: boolean;
    title: string;
    params: ScriptParam[];
    resultType: string;
    importedConfigItemNames?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    onClose: () => void;
}

const formatDateTime = (value?: Date) => {
    if (!value) {
        return 'Not available';
    }
    try {
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(value));
    } catch {
        return 'Not available';
    }
};

const ScriptInfoDialog = ({
    open,
    title,
    params,
    resultType,
    importedConfigItemNames = [],
    createdAt,
    updatedAt,
    onClose,
}: ScriptInfoDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                component="div"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {title} - Info
                <IconButton aria-label="close script information" onClick={onClose} edge="end">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'grid', gap: 3 }}>
                <section>
                    <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                        General metadata
                    </Typography>
                    <Table aria-label="script general metadata" size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>Created at</TableCell>
                                <TableCell>{formatDateTime(createdAt)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Updated at</TableCell>
                                <TableCell>{formatDateTime(updatedAt)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </section>
                <section>
                    <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                        Input parameters
                    </Typography>
                    <Table aria-label="script input parameters" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {params.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2}>No input parameters</TableCell>
                                </TableRow>
                            ) : (
                                params.map((param) => (
                                    <TableRow key={param.name}>
                                        <TableCell>{param.name}</TableCell>
                                        <TableCell>{param.type}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </section>
                <section>
                    <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                        Result type
                    </Typography>
                    <Table aria-label="script return type" size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{resultType}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </section>
                <section>
                    <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                        Imported config items
                    </Typography>
                    {importedConfigItemNames.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No imported config items
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {importedConfigItemNames.map((configItemName) => (
                                <Chip key={configItemName} label={configItemName} size="small" />
                            ))}
                        </Box>
                    )}
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default ScriptInfoDialog;
