import { useState, useContext } from 'react';
import { ConfigItemsContext } from '../../../../contexts/ConfigItemsContext';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import ActionButton from '../../../UI/ActionButton/ActionButton';
import CodeDialog from '../../../UI/CodeDialog';
import EditToggleActions from '../../../UI/EditToggleActions/EditToggleActions';
import EntryCard from '../../../UI/EntryCard/EntryCard';
import ScriptInfoDialog from './ScriptInfoDialog';
import { CardsGrid, SearchField } from './ScriptsTab.styles';
import { ScriptsContext } from '../../../../contexts/ScriptsContext';
import { UsersContext } from '../../../../contexts/UsersContext';
import { useEditingIds } from '../../../../hooks/useEditingIds';

const ScriptsTab = () => {
    const [search, setSearch] = useState('');
    const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
    const [infoScriptId, setInfoScriptId] = useState<string | null>(null);
    const { isEditing, startEditing, stopEditing } = useEditingIds();
    const query = search.toLowerCase();
    const { scripts } = useContext(ScriptsContext);
    const { configItems } = useContext(ConfigItemsContext);
    const { users } = useContext(UsersContext);

    const filteredScripts = scripts.filter((script) => script.name.toLowerCase().includes(query));
    const selectedScript = scripts.find((script) => script.id === selectedScriptId) ?? null;
    const infoScript = scripts.find((script) => script.id === infoScriptId) ?? null;
    const infoScriptCreatorName =
        users.find((user) => user.id === infoScript?.creatorId)?.name ?? infoScript?.creatorId;
    const infoScriptWithConfig = infoScript as
        | (typeof infoScript & {
              configDependencies?: Array<{
                  configItemId?: string | null;
              }>;
          })
        | null;
    const importedConfigItemNames =
        infoScriptWithConfig?.configDependencies
            ?.map(
                (dependency) =>
                    configItems.find((item) => item.id === dependency.configItemId)?.name,
            )
            .filter((name): name is string => Boolean(name)) ?? [];

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
                {filteredScripts.map((script) => {
                    const editing = isEditing(script.id);

                    return (
                        <EntryCard
                            key={script.id}
                            name={script.name}
                            description={script.description}
                            editing={editing}
                            deleteAction={
                                <ActionButton
                                    label="delete script"
                                    sx={{ width: 28, height: 28, minHeight: 0 }}
                                >
                                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                </ActionButton>
                            }
                            actions={
                                <>
                                    <ActionButton
                                        label="info"
                                        onClick={() => setInfoScriptId(script.id)}
                                    >
                                        <InfoOutlinedIcon fontSize="small" />
                                    </ActionButton>
                                    <ActionButton
                                        label="view code"
                                        onClick={() => setSelectedScriptId(script.id)}
                                    >
                                        <CodeIcon fontSize="small" />
                                    </ActionButton>
                                    <EditToggleActions
                                        isEditing={editing}
                                        onEdit={() => startEditing(script.id)}
                                        onSave={() => stopEditing(script.id)}
                                        onDiscard={() => stopEditing(script.id)}
                                    />
                                    {!editing && (
                                        <ActionButton label="run script" color="primary">
                                            <PlayArrowIcon fontSize="small" />
                                        </ActionButton>
                                    )}
                                </>
                            }
                        />
                    );
                })}
            </CardsGrid>
            <CodeDialog
                open={selectedScript !== null}
                title={selectedScript?.name ?? ''}
                code={selectedScript?.code ?? ''}
                availableObjects={[
                    { name: 'params', description: 'Input parameters passed to this run' },
                    { name: 'config', description: 'Values from imported config items' },
                ]}
                onClose={() => setSelectedScriptId(null)}
            />
            <ScriptInfoDialog
                open={infoScript !== null}
                title={infoScript?.name ?? ''}
                params={infoScript?.paramsSchema ?? []}
                resultType={infoScript?.resultType ?? 'void'}
                importedConfigItemNames={importedConfigItemNames}
                creatorName={infoScriptCreatorName}
                createdAt={infoScript?.createdAt}
                updatedAt={infoScript?.updatedAt}
                onClose={() => setInfoScriptId(null)}
            />
        </>
    );
};

export default ScriptsTab;
