import { useContext } from 'react';
import Editor from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { ColorModeContext } from '../../contexts/ColorModeContext';

export interface AvailableObject {
    name: string;
    description: string;
}

interface CodeDialogProps {
    open: boolean;
    title: string;
    code: string;
    language?: string;
    availableObjects?: AvailableObject[];
    onClose: () => void;
}

const CodeDialog = ({
    open,
    title,
    code,
    language = 'javascript',
    availableObjects = [],
    onClose,
}: CodeDialogProps) => {
    const { mode } = useContext(ColorModeContext);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle
                component="div"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {title} - Code
                <IconButton aria-label="close code viewer" onClick={onClose} edge="end">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {availableObjects.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                        px: 3,
                        py: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Available in this script:
                    </Typography>
                    {availableObjects.map((object) => (
                        <Tooltip key={object.name} title={object.description} arrow>
                            <Chip label={object.name} size="small" variant="outlined" />
                        </Tooltip>
                    ))}
                </Box>
            )}
            <DialogContent dividers sx={{ height: '70vh', p: 0 }}>
                <Editor
                    height="100%"
                    language={language}
                    defaultLanguage={language}
                    value={code}
                    theme={mode === 'dark' ? 'vs-dark' : 'vs'}
                    options={{
                        automaticLayout: true,
                        minimap: { enabled: false },
                        readOnly: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CodeDialog;
