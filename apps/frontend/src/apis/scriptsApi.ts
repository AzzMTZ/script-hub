import type { Script } from '@script-hub/types';
import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function fetchScripts(): Promise<Script[]> {
    const response = await axios.get<Script[]>(`${apiBaseUrl}/scripts`);

    return response.data;
}
