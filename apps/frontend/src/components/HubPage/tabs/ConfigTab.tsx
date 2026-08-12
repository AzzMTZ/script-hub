import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { CardsGrid, SearchField } from '../HubPage.styles';
import ActionButton from '../../UI/ActionButton';
import CodeDialog from '../../UI/CodeDialog';
import ConfigItemInfoDialog from '../../UI/ConfigItemInfoDialog';
import EntryCard from '../../UI/EntryCard';
import { useConfigItemsQuery } from '../../../hooks/useConfigItems';

const ConfigTab = () => {
    const [search, setSearch] = useState('');
    const [selectedConfigItemId, setSelectedConfigItemId] = useState<string | null>(null);
    const [infoConfigItemId, setInfoConfigItemId] = useState<string | null>(null);
    const configItems = useConfigItemsQuery().data ?? [];
    const query = search.toLowerCase();
    const filteredConfigEntries = configItems.filter((entry) =>
        entry.name.toLowerCase().includes(query),
    );
    const selectedConfigItem =
        configItems.find((entry) => entry.id === selectedConfigItemId) ?? null;
    const infoConfigItem = configItems.find((entry) => entry.id === infoConfigItemId) ?? null;

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
                {filteredConfigEntries.map((entry) => (
                    <EntryCard
                        key={entry.id}
                        name={entry.name}
                        description={entry.description}
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
                                    color="primary"
                                    onClick={() => setSelectedConfigItemId(entry.id)}
                                >
                                    <CodeIcon fontSize="small" />
                                </ActionButton>
                            </>
                        }
                    />
                ))}
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
                description={infoConfigItem?.description ?? ''}
                createdAt={infoConfigItem?.createdAt}
                updatedAt={infoConfigItem?.updatedAt}
                onClose={() => setInfoConfigItemId(null)}
            />
        </>
    );
};

export default ConfigTab;
