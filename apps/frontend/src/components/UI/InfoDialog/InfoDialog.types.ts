import type { ReactNode } from 'react';

export type MetadataRow = {
    label: string;
    value: ReactNode;
};

export type InfoSection = {
    title: string;
    content: ReactNode;
    inline?: boolean;
};
