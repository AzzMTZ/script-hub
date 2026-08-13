import Editor from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

interface CodeDialogProps {
    open: boolean;
    title: string;
    code: string;
    onClose: () => void;
}

const CodeDialog = ({ open, title, code, onClose }: CodeDialogProps) => {
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