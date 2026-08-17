import { PlantDTO } from './plant';

export interface ScanLogEntry {
  id: string;
  scientificName: string;
  commonName: string;
  confidence: number;
  imageUri: string;
  scannedAt: string;
}

export interface SavedPlant {
  scientificName: string;
  commonName: string;
  imageUri: string;
  savedAt: string;
  plantInfo: PlantDTO;
}