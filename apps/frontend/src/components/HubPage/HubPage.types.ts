export interface Script {
    id: string;
    name: string;
    description: string;
}

export interface ConfigEntry {
    id: string;
    name: string;
    description: string;
}

export interface Run {
    id: string;
    scriptName: string;
    user: string;
    timestamp: string;
}

export type ScriptsTabKey = 'scripts' | 'config' | 'runs';
