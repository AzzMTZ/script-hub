import type { Run } from '@script-hub/types';
import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function fetchRuns(): Promise<Run[]> {
    const response = await axios.get<Run[]>(`${apiBaseUrl}/runs`);

    return response.data;
}
