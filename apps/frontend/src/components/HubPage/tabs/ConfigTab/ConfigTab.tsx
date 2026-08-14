import { useContext, useState } from 'react';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ActionButton from '../../../UI/ActionButton/ActionButton';
import CodeDialog from '../../../UI/CodeDialog';
import EditToggleActions from '../../../UI/EditToggleActions/EditToggleActions';
import EntryCard from '../../../UI/EntryCard/EntryCard';
import { ConfigItemsContext } from '../../../../contexts/ConfigItemsContext';
import { UsersContext } from '../../../../contexts/UsersContext';
import ConfigItemInfoDialog from './ConfigItemInfoDialog';
import { CardsGrid, SearchField } from './ConfigTab.styles';
import { useEditingIds } from '../../../../hooks/useEditingIds';

const ConfigTab = () => {
    const [search, setSearch] = useState('');
    const [selectedConfigItemId, setSelectedConfigItemId] = useState<string | null>(null);
    const [infoConfigItemId, setInfoConfigItemId] = useState<string | null>(null);
    const { isEditing, startEditing, stopEditing } = useEditingIds();
    const { configItems } = useContext(ConfigItemsContext);
    const { users } = useContext(UsersContext);
    const query = search.toLowerCase();
    const filteredConfigEntries = configItems.filter((entry) =>
        entry.name.toLowerCase().includes(query),
    );
    const selectedConfigItem =
        configItems.find((entry) => entry.id === selectedConfigItemId) ?? null;
    const infoConfigItem = configItems.find((entry) => entry.id === infoConfigItemId) ?? null;
    const infoConfigItemCreatorName =
        users.find((user) => user.id === infoConfigItem?.creatorId)?.name ??
        infoConfigItem?.creatorId;

    return (
        <>
            <SearchField
                fullWidth
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <CardsGrid>
                {filteredConfigEntries.map((entry) => {
                    const editing = isEditing(entry.id);

                    return (
                        <EntryCard
                            key={entry.id}
                            name={entry.name}
                            description={entry.description}
                            icon={<SettingsSuggestIcon fontSize="small" />}
                            editing={editing}
                            deleteAction={
                                <ActionButton
                                    label="delete config item"
                                    sx={{ width: 28, height: 28, minHeight: 0 }}
                                >
                                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                </ActionButton>
                            }
                            actions={
                                <>
                                    <ActionButton
                                        label="info"
                                        onClick={() => setInfoConfigItemId(entry.id)}
                                    >
                                        <InfoOutlinedIcon fontSize="small" />
                                    </ActionButton>
                                    <ActionButton
                                        label="view code"
                                        onClick={() => setSelectedConfigItemId(entry.id)}
                                    >
                                        <CodeIcon fontSize="small" />
                                    </ActionButton>
                                    <EditToggleActions
                                        isEditing={editing}
                                        onEdit={() => startEditing(entry.id)}
                                        onSave={() => stopEditing(entry.id)}
                                        onDiscard={() => stopEditing(entry.id)}
                                    />
                                </>
                            }
                        />
                    );
                })}
            </CardsGrid>
            <CodeDialog
                open={selectedConfigItem !== null}
                title={selectedConfigItem?.name ?? ''}
                code={JSON.stringify(selectedConfigItem?.code ?? '', null, 2)}
                onClose={() => setSelectedConfigItemId(null)}
            />
            <ConfigItemInfoDialog
                open={infoConfigItem !== null}
                title={infoConfigItem?.name ?? ''}
                creatorName={infoConfigItemCreatorName}
                createdAt={infoConfigItem?.createdAt}
                updatedAt={infoConfigItem?.updatedAt}
                onClose={() => setInfoConfigItemId(null)}
            />
        </>
    );
};

export default ConfigTab;
