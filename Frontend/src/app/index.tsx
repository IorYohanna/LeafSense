import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTensorflowModel } from 'react-native-fast-tflite';
import jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

import { LABELS } from '../constants/labels';
import { API_URL } from '../constants/api';
import { saveScan } from '@/services/localStorage';
import { Link } from 'expo-router';

interface CareInstruction {
  wateringFrequency?: string;
  sunlightNeeds?: string;
}
interface ToxicityInfo {
  toxicToCats?: boolean;
}
interface PlantDTO {
  scientificName: string;
  commonName: string;
  careInstruction?: CareInstruction;
  toxicityInfo?: ToxicityInfo;
}

export default function HomeScreen() {
  const model = useTensorflowModel(require('../../assets/models/plant_model.tflite'), []);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const resetState = () => {
    setError(null);
    setResult(null);
    setPlantInfo(null);
    setNotFound(false);
  };

  const pickImage = async (fromCamera: boolean) => {
    resetState();

    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError('Permission refusée');
      return;
    }

    const pickerResult = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

    if (pickerResult.canceled) return;

    const uri = pickerResult.assets[0].uri;
    setImageUri(uri);
    await runInference(uri);
  };

  const runInference = async (uri: string) => {
    if (model.state !== 'loaded') {
      setError('Modèle pas encore chargé, réessayez dans un instant');
      return;
    }

    setLoading(true);
    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 224, height: 224 } }],
        { base64: true, format: ImageManipulator.SaveFormat.JPEG }
      );

      const buffer = Buffer.from(manipulated.base64!, 'base64');
      const decoded = jpeg.decode(buffer, { useTArray: true });

      const { width, height, data } = decoded;
      const input = new Float32Array(width * height * 3);
      let j = 0;
      for (let i = 0; i < data.length; i += 4) {
        input[j++] = data[i] / 255;
        input[j++] = data[i + 1] / 255;
        input[j++] = data[i + 2] / 255;
      }

      const outputs = model.model!.runSync([input.buffer]);
      const scores = new Float32Array(outputs[0] as ArrayBuffer);

      let maxIndex = 0;
      for (let i = 1; i < scores.length; i++) {
        if (scores[i] > scores[maxIndex]) maxIndex = i;
      }

      const label = LABELS[maxIndex];
      const confidence = scores[maxIndex];
      setResult({ label, confidence });

      await fetchPlantInfo(label, confidence, uri);
    } catch (e: any) {
      setError('Erreur inférence : ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlantInfo = async (scientificName: string, confidence: number, imageUri: string) => {
    try {
      const url = `${API_URL}/plants/search-by-scientific-name?name=${encodeURIComponent(scientificName)}`;
      const res = await fetch(url);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error(`Backend a répondu ${res.status}`);
      const data: PlantDTO = await res.json();
      setPlantInfo(data);

      // Sauvegarde locale automatique
      await saveScan({
        scientificName: data.scientificName,
        commonName: data.commonName,
        confidence,
        imageUri,
        plantInfo: data,
      });
    } catch (e: any) {
      setError('Erreur backend : ' + e.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>🌿 LeafSense</Text>
      <Text style={styles.subtitle}>Test caméra/galerie → TFLite → Backend</Text>

      {model.state === 'loading' && <Text style={styles.muted}>Chargement du modèle...</Text>}
      {model.state === 'error' && <Text style={styles.error}>Erreur de chargement du modèle .tflite</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => pickImage(true)}>
          <Text style={styles.buttonText}>📷 Caméra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => pickImage(false)}>
          <Text style={styles.buttonText}>🖼️ Galerie</Text>
        </TouchableOpacity>
      </View>
      <Link href="/History" style={styles.historyLink}>
        <Text style={styles.historyLinkText}>📋 Voir mes plantes</Text>
      </Link>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#2f8f5b" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Identifié : {result.label}</Text>
          <Text style={styles.resultConfidence}>
            Confiance : {(result.confidence * 100).toFixed(1)}%
          </Text>
        </View>
      )}

      {notFound && (
        <View style={styles.warnBox}>
          <Text style={styles.warnText}>
            Plante identifiée mais absente de la base — normal si la photo était hors des 15 espèces.
          </Text>
        </View>
      )}

      {plantInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{plantInfo.commonName}</Text>
          <Text>💧 {plantInfo.careInstruction?.wateringFrequency ?? '—'}</Text>
          <Text>☀️ {plantInfo.careInstruction?.sunlightNeeds ?? '—'}</Text>
          <Text>🐱 Toxique chats : {plantInfo.toxicityInfo?.toxicToCats ? 'Oui' : 'Non'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#777', marginBottom: 20 },
  muted: { color: '#777' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  buttonPrimary: { backgroundColor: '#2f8f5b', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  buttonSecondary: { backgroundColor: '#444', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '600' },
  image: { width: 220, height: 220, borderRadius: 12, marginTop: 20 },
  error: { color: '#c0392b', marginTop: 12, textAlign: 'center' },
  resultBox: { marginTop: 20, padding: 14, backgroundColor: '#eafaf0', borderRadius: 10, width: '100%' },
  resultLabel: { fontWeight: 'bold', fontSize: 15 },
  resultConfidence: { color: '#555', marginTop: 2 },
  warnBox: { marginTop: 12, padding: 14, backgroundColor: '#fff3e0', borderRadius: 10, width: '100%' },
  warnText: { color: '#8a5a00', fontSize: 13 },
  infoBox: { marginTop: 12, padding: 14, backgroundColor: '#f4f4f4', borderRadius: 10, width: '100%', gap: 4 },
  infoTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  historyLink: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  historyLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});