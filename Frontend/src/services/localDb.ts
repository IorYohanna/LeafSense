// Frontend/src/services/localDb.ts
import * as SQLite from 'expo-sqlite';
import { ScanRecord } from '@/types';

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('plantapp.db');
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS scan_history (
        local_uuid TEXT PRIMARY KEY NOT NULL,
        scientific_name TEXT NOT NULL,
        common_name TEXT NOT NULL,
        confidence REAL NOT NULL,
        scanned_at TEXT NOT NULL,
        photo_uri TEXT,
        synced INTEGER NOT NULL DEFAULT 0
      );
    `);
  }
  return dbInstance;
}

interface ScanRow {
  local_uuid: string;
  scientific_name: string;
  common_name: string;
  confidence: number;
  scanned_at: string;
  photo_uri: string | null;
  synced: number;
}

function rowToRecord(row: ScanRow): ScanRecord {
  return {
    localUuid: row.local_uuid,
    scientificName: row.scientific_name,
    commonName: row.common_name,
    confidence: row.confidence,
    scannedAt: row.scanned_at,
    photoUri: row.photo_uri,
    synced: row.synced === 1,
  };
}

export const localDb = {
  /** Ecrit un scan immediatement en local, qu'il y ait connexion ou non. */
  async insertScan(record: Omit<ScanRecord, 'synced'>): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO scan_history (local_uuid, scientific_name, common_name, confidence, scanned_at, photo_uri, synced)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [
        record.localUuid,
        record.scientificName,
        record.commonName,
        record.confidence,
        record.scannedAt,
        record.photoUri,
      ]
    );
  },

  /** Historique complet, du plus recent au plus ancien, pour l'ecran "Mes Plantes". */
  async getAllScans(): Promise<ScanRecord[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<ScanRow>(
      `SELECT * FROM scan_history ORDER BY scanned_at DESC`
    );
    return rows.map(rowToRecord);
  },

  /** Scans pas encore envoyes au backend (flag synced = false). */
  async getUnsyncedScans(): Promise<ScanRecord[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<ScanRow>(
      `SELECT * FROM scan_history WHERE synced = 0 ORDER BY scanned_at ASC`
    );
    return rows.map(rowToRecord);
  },

  /** Marque une liste de scans comme synchronises apres succes de l'appel /history/sync. */
  async markSynced(localUuids: string[]): Promise<void> {
    if (localUuids.length === 0) return;
    const db = await getDb();
    const placeholders = localUuids.map(() => '?').join(',');
    await db.runAsync(
      `UPDATE scan_history SET synced = 1 WHERE local_uuid IN (${placeholders})`,
      localUuids
    );
  },
};
