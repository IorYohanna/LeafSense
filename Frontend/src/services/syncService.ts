// Frontend/src/services/syncService.ts
import NetInfo from '@react-native-community/netinfo';
import { localDb } from './localDb';
import { api } from './api';
import { authStorage } from './authStorage';

let syncInProgress = false;

/**
 * Envoie en lot les scans locaux non synchronises vers le backend, si et
 * seulement si une connexion est disponible et l'utilisateur authentifie.
 * Pas de gestion de conflits bidirectionnelle : push local -> serveur uniquement,
 * le localUuid garantit l'idempotence cote serveur.
 */
export async function trySyncPendingScans(): Promise<void> {
  if (syncInProgress) return;

  const isLoggedIn = await authStorage.isLoggedIn();
  if (!isLoggedIn) return;

  const netState = await NetInfo.fetch();
  if (!netState.isConnected || !netState.isInternetReachable) return;

  const pending = await localDb.getUnsyncedScans();
  if (pending.length === 0) return;

  syncInProgress = true;
  try {
    const result = await api.syncHistory(
      pending.map((scan) => ({
        localUuid: scan.localUuid,
        scientificName: scan.scientificName,
        confidence: scan.confidence,
        scannedAt: scan.scannedAt,
      }))
    );

    // "synced" et "alreadySynced" sont tous deux des succes du point de vue de l'app :
    // dans les deux cas, le serveur a bien la ligne, donc on peut marquer synced=1 localement.
    const confirmedUuids = [...result.synced, ...result.alreadySynced];
    await localDb.markSynced(confirmedUuids);
  } catch (error) {
    // Echec silencieux : on reessaiera au prochain declenchement
    // (changement de connectivite, retour sur l'app, nouveau scan).
    console.warn('Synchronisation echouee, nouvelle tentative plus tard', error);
  } finally {
    syncInProgress = false;
  }
}

/**
 * Abonnement aux changements de connectivite : declenche une tentative de sync
 * des qu'une connexion redevient disponible. A appeler une fois au demarrage de l'app.
 */
export function subscribeToConnectivityChanges(): () => void {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable) {
      trySyncPendingScans();
    }
  });
  return unsubscribe;
}
