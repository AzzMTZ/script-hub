import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import { CardsGrid, SearchField } from '../HubPage.styles';
import { useScriptsQuery } from '../../../hooks/useScripts';
import ActionButton from '../../UI/ActionButton';
import CodeDialog from '../../UI/CodeDialog';
import EntryCard from '../../UI/EntryCard';
import ScriptInfoDialog from '../../UI/ScriptInfoDialog';

const ScriptsTab = () => {
    const [search, setSearch] = useState('');
    const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
    const [infoScriptId, setInfoScriptId] = useState<string | null>(null);
    const query = search.toLowerCase();
    const scripts = useScriptsQuery().data ?? [];
    const filteredScripts = scripts.filter((script) => script.name.toLowerCase().includes(query));
    const selectedScript = scripts.find((script) => script.id === selectedScriptId) ?? null;
    const infoScript = scripts.find((script) => script.id === infoScriptId) ?? null;
    const infoScriptWithConfig = infoScript as
        | (typeof infoScript & {
              configDependencies?: Array<{
                  configItem?: {
                      name?: string | null;
                  } | null;
              }>;
          })
        | null;
    const importedConfigItemNames =
        infoScriptWithConfig?.configDependencies
            ?.map((dependency) => dependency.configItem?.name)
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
                {filteredScripts.map((script) => (
                    <EntryCard
                        key={script.id}
                        name={script.name}
                        description={script.description}
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
                                <ActionButton label="run script" color="primary">
                                    <PlayArrowIcon fontSize="small" />
                                </ActionButton>
                            </>
                        }
                    />
                ))}
            </CardsGrid>
            <CodeDialog
                open={selectedScript !== null}
                title={selectedScript?.name ?? ''}
                code={selectedScript?.code ?? ''}
                onClose={() => setSelectedScriptId(null)}
            />
            <ScriptInfoDialog
                open={infoScript !== null}
                title={infoScript?.name ?? ''}
                params={infoScript?.paramsSchema ?? []}
                resultType={infoScript?.resultType ?? 'void'}
                importedConfigItemNames={importedConfigItemNames}
                createdAt={infoScript?.createdAt}
                updatedAt={infoScript?.updatedAt}
                onClose={() => setInfoScriptId(null)}
            />
        </>
    );
};

export default ScriptsTab;
