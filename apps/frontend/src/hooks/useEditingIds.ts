import { useState } from 'react';

export const useEditingIds = () => {
    const [editingIds, setEditingIds] = useState<Set<string>>(new Set());

    const startEditing = (id: string) => {
        setEditingIds((prev) => new Set(prev).add(id));
    };

    const stopEditing = (id: string) => {
        setEditingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const isEditing = (id: string) => editingIds.has(id);

    return { isEditing, startEditing, stopEditing };
};
