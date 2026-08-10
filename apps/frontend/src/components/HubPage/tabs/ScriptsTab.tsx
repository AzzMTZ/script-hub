import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import { CardsGrid, SearchField } from '../HubPage.styles';
import { scripts } from '../HubPage.consts';
import ActionButton from '../../UI/ActionButton';
import EntryCard from '../../UI/EntryCard';

const ScriptsTab = () => {
    const [search, setSearch] = useState('');
    const query = search.toLowerCase();
    const filteredScripts = scripts.filter((script) => script.name.toLowerCase().includes(query));

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
                                <ActionButton label="info">
                                    <InfoOutlinedIcon fontSize="small" />
                                </ActionButton>
                                <ActionButton label="view code">
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
        </>
    );
};

export default ScriptsTab;
