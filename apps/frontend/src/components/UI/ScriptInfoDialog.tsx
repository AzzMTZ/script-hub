import {
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import type { ScriptParam } from '@script-hub/types';
import InfoDialog from './InfoDialog';

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
        <InfoDialog
            open={open}
            title={`${title} - Info`}
            metadataRows={[
                {
                    label: 'Created at',
                    value: createdAt ? new Date(createdAt).toLocaleString() : 'Not available',
                },
                {
                    label: 'Updated at',
                    value: updatedAt ? new Date(updatedAt).toLocaleString() : 'Not available',
                },
            ]}
            sections={[
                {
                    title: 'Input parameters',
                    content: (
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
                    ),
                },
                {
                    title: 'Result type',
                    content: (
                        <Table aria-label="script return type" size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{resultType}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    ),
                },
                {
                    title: 'Imported config items',
                    content:
                        importedConfigItemNames.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                No imported config items
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {importedConfigItemNames.map((configItemName) => (
                                    <Chip
                                        key={configItemName}
                                        label={configItemName}
                                        size="small"
                                    />
                                ))}
                            </Box>
                        ),
                },
            ]}
            onClose={onClose}
        />
    );
};

export default ScriptInfoDialog;
