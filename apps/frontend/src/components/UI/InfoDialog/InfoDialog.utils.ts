import type { ReactNode } from 'react';

export const formatDateTime = (value?: Date | string | number | null) => {
    if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
    ) {
        return 'Not available';
    }

    try {
        const date = value instanceof Date ? value : new Date(value);

        if (Number.isNaN(date.getTime())) {
            return 'Not available';
        }

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    } catch {
        return 'Not available';
    }
};

export const renderValue = (value: ReactNode) => {
    if (value instanceof Date) {
        return formatDateTime(value);
    }

    if (typeof value === 'string' || typeof value === 'number') {
        const trimmed = typeof value === 'string' ? value.trim() : value;

        if (trimmed === '') {
            return 'Not available';
        }

        const dateValue = new Date(trimmed);
        if (!Number.isNaN(dateValue.getTime())) {
            return formatDateTime(dateValue);
        }
    }

    return value ?? 'Not available';
};
