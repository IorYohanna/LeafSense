// Fiche complète d'une plante, telle que retournée par GET /api/plants/search
export interface PlantDetail {
  id: number;
  commonName: string;
  scientificName: string;
  difficultyLevel: string;
  toxicityHumans: string | null;
  toxicityDogs: string | null;
  toxicityCats: string | null;
  wateringInfo: string | null;
  lightRequirement: string | null;
  climateInfo: string | null;
  maxHeightCm: number | null;
  leafType: string | null;
  plantingPeriod: string | null;
}

// Resultat brut de l'inference TFLite, avant recuperation de la fiche
export interface InferenceResult {
  scientificName: string;
  confidence: number;
}

// Ligne d'historique telle que stockee localement en SQLite
export interface ScanRecord {
  localUuid: string;
  scientificName: string;
  confidence: number;
  scannedAt: string; // ISO 8601
  synced: boolean;
  // Fiche mise en cache localement pour un affichage hors ligne dans "Mes Plantes"
  commonName: string;
  photoUri: string | null;
}

// Reponse de GET /api/history (scan deja synchronise cote serveur)
export interface ServerScanHistoryItem {
  id: number;
  localUuid: string;
  confidence: number;
  scannedAt: string;
  plant: PlantDetail;
}

export interface AuthResponse {
  token: string;
  email: string;
  expiresInMs: number;
}

export interface SyncResult {
  synced: string[];
  alreadySynced: string[];
  failed: string[];
}

// Params de navigation, utilises par React Navigation pour typer chaque ecran
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Result: { photoUri: string; scientificName: string; confidence: number };
  // Note : le champ "fromLocalUuid" precedemment present ici n'etait jamais lu
  // nulle part dans l'app (mort-code) ; il a ete retire pour eviter la confusion.
  PlantDetail: { scientificName: string };
};

export type MainTabParamList = {
  Scan: undefined;
  MyPlants: undefined;
  Profile: undefined;
};
