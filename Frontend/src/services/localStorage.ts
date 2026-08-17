import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScanLogEntry, SavedPlant } from '../types/scan';
import { PlantDTO } from '../types/plant';
import { User } from '../types/user';

const SESSION_KEY = 'leafsense_session';
const LOG_KEY = 'leafsense_scan_log';
const SAVED_KEY = 'leafsense_saved_plants';

// --- Session ---
export async function saveSession(user: User): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
export async function getSession(): Promise<User | null> {
  const json = await AsyncStorage.getItem(SESSION_KEY);
  return json ? JSON.parse(json) : null;
}
export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export const resetOnboarding = async (): Promise<void> => {
  await AsyncStorage.removeItem('hasOnboarded');
};

export const getHasOnboarded = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem('hasOnboarded');
  return value === 'true';
};

export const setHasOnboarded = async (value: boolean): Promise<void> => {
  await AsyncStorage.setItem('hasOnboarded', value ? 'true' : 'false');
};

// --- Historique (log chronologique, un événement par scan, sans dédup) ---
export async function getScanLog(): Promise<ScanLogEntry[]> {
  const json = await AsyncStorage.getItem(LOG_KEY);
  return json ? JSON.parse(json) : [];
}
export async function getTodayLog(): Promise<ScanLogEntry[]> {
  const log = await getScanLog();
  const todayStr = new Date().toDateString();
  return log.filter((e) => new Date(e.scannedAt).toDateString() === todayStr);
}
async function appendToLog(entry: Omit<ScanLogEntry, 'id' | 'scannedAt'>): Promise<void> {
  const log = await getScanLog();
  const newEntry: ScanLogEntry = { ...entry, id: Date.now().toString(), scannedAt: new Date().toISOString() };
  await AsyncStorage.setItem(LOG_KEY, JSON.stringify([newEntry, ...log]));
}
export async function deleteLogEntry(id: string): Promise<void> {
  const log = await getScanLog();
  await AsyncStorage.setItem(LOG_KEY, JSON.stringify(log.filter((e) => e.id !== id)));
}
export async function clearScanLog(): Promise<void> {
  await AsyncStorage.removeItem(LOG_KEY);
}

// --- Mes Plantes (bibliothèque dédupliquée par espèce) ---
export async function getSavedPlants(): Promise<SavedPlant[]> {
  const json = await AsyncStorage.getItem(SAVED_KEY);
  return json ? JSON.parse(json) : [];
}
async function upsertSavedPlant(plant: Omit<SavedPlant, 'savedAt'>): Promise<void> {
  const saved = await getSavedPlants();
  const filtered = saved.filter((p) => p.scientificName !== plant.scientificName);
  const updated: SavedPlant = { ...plant, savedAt: new Date().toISOString() };
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify([updated, ...filtered]));
}
export async function deleteSavedPlant(scientificName: string): Promise<void> {
  const saved = await getSavedPlants();
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(saved.filter((p) => p.scientificName !== scientificName)));
}
export async function clearSavedPlants(): Promise<void> {
  await AsyncStorage.removeItem(SAVED_KEY);
}
export async function searchSavedPlants(query: string): Promise<SavedPlant[]> {
  const saved = await getSavedPlants();
  const q = query.trim().toLowerCase();
  if (!q) return saved;
  return saved.filter(
    (p) => p.commonName.toLowerCase().includes(q) || p.scientificName.toLowerCase().includes(q)
  );
}

// --- Appelée après un scan réussi : alimente les deux à la fois ---
export async function recordScan(params: {
  scientificName: string;
  commonName: string;
  confidence: number;
  imageUri: string;
  plantInfo: PlantDTO;
}): Promise<void> {
  await appendToLog({
    scientificName: params.scientificName,
    commonName: params.commonName,
    confidence: params.confidence,
    imageUri: params.imageUri,
  });
  await upsertSavedPlant({
    scientificName: params.scientificName,
    commonName: params.commonName,
    imageUri: params.imageUri,
    plantInfo: params.plantInfo,
  });
}