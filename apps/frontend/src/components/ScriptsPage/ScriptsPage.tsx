import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button, InputAdornment, Stack, Tab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import TerminalIcon from '@mui/icons-material/Terminal';
import {
    ActionButtonRoot,
    ActionsStack,
    AddFab,
    BrandAvatar,
    BrandStack,
    CardsGrid,
    ClampedDescription,
    EntryAvatar,
    EntryCardContent,
    EntryHeaderStack,
    HeaderToolbar,
    InlineActionsStack,
    PageContainer,
    PageHeader,
    PageRoot,
    PageTitle,
    RunAvatar,
    RunCardContent,
    RunTextBox,
    SearchField,
    StyledAppBar,
    StyledEntryCard,
    StyledRunCard,
    StyledTabs,
    TimestampText,
    UserStack,
} from './ScriptsPage.styles';

interface Script {
    id: string;
    name: string;
    description: string;
}

interface ConfigEntry {
    id: string;
    name: string;
    description: string;
}

interface Run {
    id: string;
    scriptName: string;
    user: string;
    timestamp: string;
}

const scripts: Script[] = [
    { id: '1', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '2', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '3', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '1', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '4', name: 'Send Mail', description: 'A script that sends emails' },
];

const configEntries: ConfigEntry[] = [
    {
        id: '1',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
    {
        id: '2',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
    {
        id: '3',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
];

const runs: Run[] = [
    { id: '1', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
    { id: '2', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
    { id: '3', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
];

const tabMeta = [
    { label: 'Scripts', subtitle: 'Browse and run the scripts available to you' },
    { label: 'Config', subtitle: 'Manage the configuration values used by your scripts' },
    { label: 'Runs', subtitle: 'Track the history of recent script executions' },
];

function ActionButton({
    label,
    color = 'default',
    onClick,
    children,
}: {
    label: string;
    color?: 'default' | 'primary';
    onClick?: () => void;
    children: ReactNode;
}) {
    return (
        <ActionButtonRoot size="small" aria-label={label} onClick={onClick} variantColor={color}>
            {children}
        </ActionButtonRoot>
    );
}

function EntryCard({
    name,
    description,
    actions,
}: {
    name: string;
    description: string;
    actions: ReactNode;
}) {
    return (
        <StyledEntryCard variant="outlined">
            <EntryCardContent>
                <EntryHeaderStack>
                    <EntryAvatar variant="rounded">
                        <TerminalIcon fontSize="small" />
                    </EntryAvatar>
                    <Typography variant="subtitle1" component="h3">
                        {name}
                    </Typography>
                </EntryHeaderStack>
                <ClampedDescription variant="body2" color="text.secondary">
                    {description}
                </ClampedDescription>
                <ActionsStack>{actions}</ActionsStack>
            </EntryCardContent>
        </StyledEntryCard>
    );
}

function RunRow({ run }: { run: Run }) {
    return (
        <StyledRunCard variant="outlined">
            <RunCardContent>
                <RunAvatar>
                    <HistoryIcon fontSize="small" />
                </RunAvatar>
                <RunTextBox>
                    <Typography variant="subtitle2" noWrap>
                        &quot;{run.scriptName}&quot;
                        <Typography component="span" variant="body2" color="text.secondary">
                            {' '}
                            &middot; run by {run.user}
                        </Typography>
                    </Typography>
                    <TimestampText variant="caption" color="text.secondary">
                        {run.timestamp}
                    </TimestampText>
                </RunTextBox>
                <InlineActionsStack>
                    <ActionButton label="info">
                        <InfoOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="view logs">
                        <ReceiptLongIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton label="cancel run">
                        <CloseIcon fontSize="small" />
                    </ActionButton>
                </InlineActionsStack>
            </RunCardContent>
        </StyledRunCard>
    );
}

export default function ScriptsPage() {
    const [tab, setTab] = useState(0);
    const [search, setSearch] = useState('');
    const query = search.toLowerCase();

    const filteredScripts = scripts.filter((script) => script.name.toLowerCase().includes(query));
    const filteredConfigEntries = configEntries.filter((entry) =>
        entry.name.toLowerCase().includes(query),
    );
    const filteredRuns = runs.filter(
        (run) =>
            run.scriptName.toLowerCase().includes(query) || run.user.toLowerCase().includes(query),
    );

    return (
        <PageRoot>
            <StyledAppBar position="sticky" color="transparent" elevation={0}>
                <HeaderToolbar>
                    <BrandStack>
                        <BrandAvatar>SH</BrandAvatar>
                        <Typography variant="h6" component="span">
                            ScriptHub
                        </Typography>
                    </BrandStack>
                    <UserStack>
                        <Typography variant="body2" color="text.secondary">
                            Hello, John Doe!
                        </Typography>
                        <Button variant="outlined" size="small">
                            Sign Out
                        </Button>
                    </UserStack>
                </HeaderToolbar>
                <StyledTabs value={tab} onChange={(_, value) => setTab(value)}>
                    <Tab label="Scripts" />
                    <Tab label="Config" />
                    <Tab label="Runs" />
                </StyledTabs>
            </StyledAppBar>

            <PageContainer maxWidth="lg">
                <PageHeader>
                    <PageTitle variant="h5">{tabMeta[tab].label}</PageTitle>
                    <Typography variant="body2" color="text.secondary">
                        {tabMeta[tab].subtitle}
                    </Typography>
                </PageHeader>

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

                {tab === 0 && (
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
                )}

                {tab === 1 && (
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
                )}

                {tab === 2 && (
                    <Stack spacing={2}>
                        {filteredRuns.map((run) => (
                            <RunRow key={run.id} run={run} />
                        ))}
                    </Stack>
                )}
            </PageContainer>

            <AddFab color="primary" aria-label="add">
                <AddIcon />
            </AddFab>
        </PageRoot>
    );
}
