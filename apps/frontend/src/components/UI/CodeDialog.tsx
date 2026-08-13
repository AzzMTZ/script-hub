import { useContext } from 'react';
import Editor from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ColorModeContext } from '../../contexts/ColorModeContext';

interface CodeDialogProps {
    open: boolean;
    title: string;
    code: string;
    onClose: () => void;
}

const CodeDialog = ({ open, title, code, onClose }: CodeDialogProps) => {
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
            <DialogContent dividers sx={{ height: '70vh', p: 0 }}>
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
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