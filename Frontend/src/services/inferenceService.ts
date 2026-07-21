// Frontend/src/services/inferenceService.ts
import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

let cachedModel: TensorflowModel | null = null;
let cachedLabels: string[] | null = null;

const MODEL_INPUT_SIZE = 224; // doit correspondre a la taille d'entree du modele exporte par Teachable Machine

/**
 * Charge une fois le modele .tflite embarque dans assets/model/.
 * Le modele est mis en cache en memoire pour les scans suivants.
 */
export async function loadPlantModel(): Promise<TensorflowModel> {
  if (cachedModel) return cachedModel;

  const modelAsset = Asset.fromModule(require('../../assets/model/plant_model.tflite'));
  await modelAsset.downloadAsync();

  if (!modelAsset.localUri) {
    throw new Error("Impossible de localiser le fichier plant_model.tflite embarque.");
  }

  cachedModel = await loadTensorflowModel({ url: modelAsset.localUri });
  return cachedModel;
}

/**
 * Parse labels.txt exporte par Teachable Machine.
 * Format attendu par ligne : "0 Monstera deliciosa" (index + espace + nom scientifique).
 * On ne se fie qu'au texte apres le premier espace, jamais a l'ordre des lignes seul,
 * pour eviter tout decalage si le fichier est retrie manuellement par erreur.
 */
export async function loadLabels(): Promise<string[]> {
  if (cachedLabels) return cachedLabels;

  const labelsAsset = Asset.fromModule(require('../../assets/model/labels.txt'));
  await labelsAsset.downloadAsync();

  if (!labelsAsset.localUri) {
    throw new Error("Impossible de localiser le fichier labels.txt embarque.");
  }

  const content = await FileSystem.readAsStringAsync(labelsAsset.localUri);

  cachedLabels = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const firstSpace = line.indexOf(' ');
      return firstSpace === -1 ? line : line.slice(firstSpace + 1).trim();
    });

  return cachedLabels;
}

export function getModelInputSize(): number {
  return MODEL_INPUT_SIZE;
}

/**
 * Convertit le tableau de probabilites en sortie du modele en un resultat exploitable :
 * l'index le plus eleve -> le nom scientifique correspondant + score de confiance.
 */
export function pickBestPrediction(
  output: Float32Array | number[],
  labels: string[]
): { scientificName: string; confidence: number } {
  let bestIndex = 0;
  let bestScore = -Infinity;

  for (let i = 0; i < output.length; i++) {
    if (output[i] > bestScore) {
      bestScore = output[i];
      bestIndex = i;
    }
  }

  return {
    scientificName: labels[bestIndex] ?? 'Inconnu',
    confidence: bestScore,
  };
}
