import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ActionButton from '../ActionButton/ActionButton';

interface EditToggleActionsProps {
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onDiscard: () => void;
}

const EditToggleActions = ({ isEditing, onEdit, onSave, onDiscard }: EditToggleActionsProps) => {
    if (isEditing) {
        return (
            <>
                <ActionButton label="discard changes" onClick={onDiscard}>
                    <CloseOutlinedIcon fontSize="small" />
                </ActionButton>
                <ActionButton label="save changes" color="primary" onClick={onSave}>
                    <SaveOutlinedIcon fontSize="small" />
                </ActionButton>
            </>
        );
    }

    return (
        <ActionButton label="edit" onClick={onEdit}>
            <EditOutlinedIcon fontSize="small" />
        </ActionButton>
    );
};

export default EditToggleActions;
