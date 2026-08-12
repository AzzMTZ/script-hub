import type { ConfigItem } from '@script-hub/types';
import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function fetchConfigItems(): Promise<ConfigItem[]> {
    const response = await axios.get<ConfigItem[]>(`${apiBaseUrl}/config-items`);

    return response.data;
}
