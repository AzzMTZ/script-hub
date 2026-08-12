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
import type { ReactNode } from 'react';

export type MetadataRow = {
    label: string;
    value: ReactNode;
};

export type InfoSection = {
    title: string;
    content: ReactNode;
};

interface InfoDialogProps {
    open: boolean;
    title: string;
    metadataRows?: MetadataRow[];
    sections?: InfoSection[];
    onClose: () => void;
}

const formatDateTime = (value?: Date | string | null) => {
    if (!value) {
        return 'Not available';
    }

    try {
        const date = value instanceof Date ? value : new Date(value);
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    } catch {
        return 'Not available';
    }
};

const renderValue = (value: ReactNode) => {
    if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
        const dateValue = value instanceof Date ? value : new Date(value);
        if (!Number.isNaN(dateValue.getTime()) && typeof value !== 'number') {
            return formatDateTime(dateValue);
        }
    }

    return value ?? 'Not available';
};

const InfoDialog = ({ open, title, metadataRows = [], sections = [], onClose }: InfoDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                component="div"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {title}
                <IconButton aria-label="close information dialog" onClick={onClose} edge="end">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'grid', gap: 3 }}>
                {metadataRows.length > 0 && (
                    <section>
                        <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                            General metadata
                        </Typography>
                        <Table size="small">
                            <TableBody>
                                {metadataRows.map(({ label, value }) => (
                                    <TableRow key={label}>
                                        <TableCell>{label}</TableCell>
                                        <TableCell>{renderValue(value)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </section>
                )}

                {sections.map(({ title, content }) => (
                    <section key={title}>
                        <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                            {title}
                        </Typography>
                        {content}
                    </section>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
