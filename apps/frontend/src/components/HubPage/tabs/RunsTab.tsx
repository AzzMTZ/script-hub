import { useState } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '../HubPage.styles';
import { runs } from '../HubPage.consts';
import RunRow from '../../UI/RunRow';

const RunsTab = () => {
    const [search, setSearch] = useState('');
    const query = search.toLowerCase();
    const filteredRuns = runs.filter(
        (run) =>
            run.scriptName.toLowerCase().includes(query) || run.user.toLowerCase().includes(query),
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
            <Stack spacing={2}>
                {filteredRuns.map((run) => (
                    <RunRow key={run.id} run={run} />
                ))}
            </Stack>
        </>
    );
};

export default RunsTab;
