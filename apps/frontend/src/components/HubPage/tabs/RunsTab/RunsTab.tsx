import { useState } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRunsQuery } from '../../../../hooks/useRuns';
import RunRow from './RunRow/RunRow';
import { SearchField } from './RunsTab.styles';

const RunsTab = () => {
    const [search, setSearch] = useState('');
    const runs = useRunsQuery().data ?? [];

    const query = search.toLowerCase();
    const filteredRuns = runs.filter(
        (run) =>
            run.scriptId.toLowerCase().includes(query) ||
            run.executorId.toLowerCase().includes(query),
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
                    <RunRow key={`${run.id}`} run={run} />
                ))}
            </Stack>
        </>
    );
};

export default RunsTab;