// Frontend/src/services/api.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './config';
import { authStorage } from './authStorage';
import { AuthResponse, PlantDetail, ServerScanHistoryItem, SyncResult } from '@/types';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// Injecte automatiquement le JWT sur toutes les requetes sortantes
client.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/register', { email, password });
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  async searchPlant(scientificName: string): Promise<PlantDetail> {
    const { data } = await client.get<PlantDetail>('/plants/search', {
      params: { scientificName },
    });
    return data;
  },

  async getHistory(): Promise<ServerScanHistoryItem[]> {
    const { data } = await client.get<ServerScanHistoryItem[]>('/history');
    return data;
  },

  async syncHistory(scans: {
    localUuid: string;
    scientificName: string;
    confidence: number;
    scannedAt: string;
  }[]): Promise<SyncResult> {
    const { data } = await client.post<SyncResult>('/history/sync', { scans });
    return data;
  },
};

/** Message d'erreur lisible a partir d'une erreur axios, pour affichage direct dans l'UI. */
export function extractApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const messages = error.response?.data?.messages;
    if (Array.isArray(messages) && messages.length > 0) {
      return messages.join(', ');
    }
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      return 'Impossible de joindre le serveur. Vérifie ta connexion et l\'adresse IP configurée.';
    }
  }
  return fallback;
}
