import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import type { MetadataRow, InfoSection } from './InfoDialog.types';
import { renderValue } from './InfoDialog.utils';

export interface InfoDialogProps {
    open: boolean;
    title: string;
    metadataRows?: MetadataRow[];
    sections?: InfoSection[];
    onClose: () => void;
}

const InfoDialog = ({
    open,
    title,
    metadataRows = [],
    sections = [],
    onClose,
}: InfoDialogProps) => {
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
                        <Table size="small" sx={{ '& tr:last-child td': { border: 0 } }}>
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

                {sections.map(({ title, content, inline }) => (
                    <section key={title}>
                        {inline ? (
                            <Typography
                                component="h3"
                                variant="subtitle2"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                {title}
                                {content}
                            </Typography>
                        ) : (
                            <>
                                <Typography component="h3" variant="subtitle2" sx={{ mb: 1 }}>
                                    {title}
                                </Typography>
                                {content}
                            </>
                        )}
                    </section>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
