import { API_URL } from '../constants/api';
import { User } from '../types/user';
import { PlantDTO } from '../types/plant';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Erreur ${res.status}`;
    try {
      const body = await res.json();
      message = body.error ?? message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export const AuthApi = {
  register: (username: string, email: string, password: string): Promise<User> =>
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    }).then(handle<User>),

  login: (username: string, password: string): Promise<User> =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handle<User>),
};

export const PlantApi = {
  getByScientificName: (name: string): Promise<PlantDTO> =>
    fetch(`${API_URL}/plants/search-by-scientific-name?name=${encodeURIComponent(name)}`).then(
      handle<PlantDTO>
    ),

  getAll: (): Promise<PlantDTO[]> =>
    fetch(`${API_URL}/plants`).then(handle<PlantDTO[]>),
};

export const ScanApi = {
  save: (userId: number, scientificName: string, confidence: number, imageUrl: string) =>
    fetch(`${API_URL}/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, scientificName, confidence, imageUrl }),
    }).then(handle),
};

export async function changePasswordRequest(
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, oldPassword, newPassword }),
  });
 
  if (!res.ok) {
    // Adapte selon le format d'erreur réel renvoyé par ton backend (message JSON, texte brut, etc.)
    const message = await res.text().catch(() => '');
    throw new Error(message || 'Impossible de modifier le mot de passe.');
  }
}