import { useContext, useState } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRunsQuery } from '../../../../hooks/useRuns';
import RunInfoDialog from './RunInfoDialog';
import RunLogsDialog from './RunLogsDialog/RunLogsDialog';
import RunRow from './RunRow/RunRow';
import { SearchField } from './RunsTab.styles';
import { ScriptsContext } from '../../../../contexts/ScriptsContext';
import { UsersContext } from '../../../../contexts/UsersContext';

const RunsTab = () => {
    const [search, setSearch] = useState('');
    const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
    const [selectedLogsRunId, setSelectedLogsRunId] = useState<string | null>(null);
    const runs = useRunsQuery().data ?? [];
    const { scripts } = useContext(ScriptsContext);
    const { users } = useContext(UsersContext);

    const sortedRuns = [...runs].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    const query = search.toLowerCase();
    const filteredRuns = sortedRuns.filter((run) => {
        const scriptName = scripts.find((script) => script.id === run.scriptId)?.name ?? run.scriptId;
        const executorName = users.find((user) => user.id === run.executorId)?.name ?? run.executorId;

        return (
            scriptName.toLowerCase().includes(query) || executorName.toLowerCase().includes(query)
        );
    });
    const selectedRun = runs.find((run) => run.id === selectedRunId) ?? null;
    const selectedRunScriptName = scripts.find((script) => script.id === selectedRun?.scriptId)?.name ?? selectedRun?.scriptId;
    const selectedRunExecutorName = users.find((user) => user.id === selectedRun?.executorId)?.name ?? selectedRun?.executorId;
    const selectedLogsRun = runs.find((run) => run.id === selectedLogsRunId) ?? null;
    const selectedLogsRunScriptName = scripts.find((script) => script.id === selectedLogsRun?.scriptId)?.name ?? selectedLogsRun?.scriptId;
    const selectedLogsRunExecutorName = users.find((user) => user.id === selectedLogsRun?.executorId)?.name ?? selectedLogsRun?.executorId;

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
                    <RunRow
                        key={`${run.id}`}
                        run={run}
                        onInfoClick={(nextRun) => setSelectedRunId(nextRun.id)}
                        onLogsClick={(nextRun) => setSelectedLogsRunId(nextRun.id)}
                    />
                ))}
            </Stack>
            <RunInfoDialog
                open={selectedRun !== null}
                title={`Run of '${selectedRunScriptName}'`}
                run={selectedRun}
                scriptName={selectedRunScriptName}
                executorName={selectedRunExecutorName}
                onClose={() => setSelectedRunId(null)}
            />
            <RunLogsDialog
                open={selectedLogsRun !== null}
                title={`Run of '${selectedLogsRunScriptName}'`}
                run={selectedLogsRun}
                scriptName={selectedLogsRunScriptName}
                executorName={selectedLogsRunExecutorName}
                onClose={() => setSelectedLogsRunId(null)}
            />
        </>
    );
};

export default RunsTab;
