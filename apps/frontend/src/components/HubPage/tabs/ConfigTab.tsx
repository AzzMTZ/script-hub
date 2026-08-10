import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { CardsGrid, SearchField } from '../HubPage.styles';
import { configEntries } from '../HubPage.consts';
import ActionButton from '../../UI/ActionButton';
import EntryCard from '../../UI/EntryCard';

const ConfigTab = () => {
    const [search, setSearch] = useState('');
    const query = search.toLowerCase();
    const filteredConfigEntries = configEntries.filter((entry) =>
        entry.name.toLowerCase().includes(query),
    );

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
                                <ActionButton label="info">
                                    <InfoOutlinedIcon fontSize="small" />
                                </ActionButton>
                                <ActionButton label="view code" color="primary">
                                    <CodeIcon fontSize="small" />
                                </ActionButton>
                            </>
                        }
                    />
                ))}
            </CardsGrid>
        </>
    );
};

export default ConfigTab;
