import { SavedScan } from "../types/scan";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "leafsense_scans";

export async function getAllScans(): Promise<SavedScan[]> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.error("Erreur de lecture stockage local:", e);
        return [];
    }
}

export async function saveScan(scan: Omit<SavedScan, 'id' | 'scannedAt'>): Promise<SavedScan> {
  const scans = await getAllScans();
  const newScan: SavedScan = {
    ...scan,
    id: Date.now().toString(),
    scannedAt: new Date().toISOString(),
  };
  const updated = [newScan, ...scans]; // plus récent en premier
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newScan;
}

export async function deleteScan(id: string): Promise<void> {
    const scans = await getAllScans();
    const updated = scans.filter(scan => scan.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteAllScans(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
}