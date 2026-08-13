import InfoDialog from '../../../UI/InfoDialog/InfoDialog';

interface ConfigItemInfoDialogProps {
    open: boolean;
    title: string;
    description: string;
    creatorName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    onClose: () => void;
}

const ConfigItemInfoDialog = ({
    open,
    title,
    description,
    creatorName,
    createdAt,
    updatedAt,
    onClose,
}: ConfigItemInfoDialogProps) => {
    return (
        <InfoDialog
            open={open}
            title={`${title} - Info`}
            metadataRows={[
                { label: 'Created by', value: <>{creatorName ?? 'Not available'}</> },
                { label: 'Created at', value: <>{createdAt ?? 'Not available'}</> },
                { label: 'Updated at', value: <>{updatedAt ?? 'Not available'}</> },
                { label: 'Description', value: description || 'No description provided' },
            ]}
            onClose={onClose}
        />
    );
};

export default ConfigItemInfoDialog;