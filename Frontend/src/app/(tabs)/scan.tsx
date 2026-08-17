import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { runInference } from '../../services/inference';
import { PlantApi, ScanApi } from '../../services/api';
import { getSession, recordScan } from '../../services/localStorage';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';


const BACKDROP_IMAGE = require('../../../assets/images/scan-backdrop.jpg');

type ScanResult = { label: string; confidence: number; commonName: string; imageUri: string } | null;

export default function ScanScreen() {
  const model = useTensorflowModel(require('../../../assets/models/plant_model.tflite'), []);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flashOn, setFlashOn] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult>(null);

  if (!permission) {
    return <View style={styles.screen} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.screen, styles.permissionScreen]}>
        <Ionicons name="camera-outline" size={40} color={COLORS.muted} />
        <Text style={styles.permissionText}>Autorisez l'accès à la caméra pour scanner vos plantes</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Autoriser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    setError(null);
    setResult(null);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        setImageUri(photo.uri);
        await handleScan(photo.uri);
      }
    } catch (e: any) {
      setError('Erreur lors de la capture');
    }
  };

  const pickFromGallery = async () => {
    setError(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError('Permission galerie refusée');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (pickerResult.canceled) return;

    const uri = pickerResult.assets[0].uri;
    setImageUri(uri);
    setResult(null);
    await handleScan(uri);
  };

  const handleScan = async (uri: string) => {
    if (model.state !== 'loaded') {
      setError('Modèle en cours de chargement, réessayez.');
      return;
    }
    setLoading(true);
    try {
      const { label, confidence } = await runInference(uri, model.model);
      const plantInfo = await PlantApi.getByScientificName(label);

      const session = await getSession();
      if (session) {
        ScanApi.save(session.id, label, confidence, uri).catch(() => { });
      }

      await recordScan({
        scientificName: label,
        commonName: plantInfo.commonName,
        confidence,
        imageUri: uri,
        plantInfo,
      });

      setResult({ label, confidence, commonName: plantInfo.commonName, imageUri: uri });
    } catch (e: any) {
      setError(e.message ?? 'Erreur pendant le scan');
    } finally {
      setLoading(false);
    }
  };

  const goToDetail = () => {
    if (!result) return;
    router.push({
      pathname: '/(tabs)/plant-detail',
      params: { scientificName: result.label, imageUri: result.imageUri },
    });
  };

  const retake = () => {
    setImageUri(null);
    setResult(null);
    setError(null);
  };

  return (
    <ImageBackground source={BACKDROP_IMAGE} style={styles.screen} blurRadius={5}>
      <View style={styles.overlay} pointerEvents="none" />

      <View style={styles.viewfinderWrap}>
        <View style={styles.viewfinder}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.viewfinderImage} />
          ) : (
            <CameraView ref={cameraRef} style={styles.viewfinderImage} facing="back" enableTorch={flashOn} />
          )}

          {imageUri && !loading && (
            <TouchableOpacity style={styles.retakeBtn} onPress={retake}>
              <Ionicons name="close" size={18} color={COLORS.white} />
            </TouchableOpacity>
          )}

          {loading && (
            <View style={styles.scanningBar}>
              <ActivityIndicator size="small" color={COLORS.white} />
              <Text style={styles.scanningText}>Analyse en cours...</Text>
            </View>
          )}
        </View>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {result && !loading ? (
        <TouchableOpacity style={styles.resultCard} onPress={goToDetail}>
          <Image source={{ uri: result.imageUri }} style={styles.resultThumb} />
          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>{result.commonName}</Text>
            <Text style={styles.resultSubtitle} numberOfLines={2}>
              {result.label} · {(result.confidence * 100).toFixed(0)}% de confiance
            </Text>
          </View>
          <View style={styles.resultArrow}>
            <Ionicons name="chevron-forward" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      ) : (
        !imageUri && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.galleryBtn} onPress={() => setFlashOn(!flashOn)}>
              <Ionicons name={flashOn ? 'flash' : 'flash-off-outline'} size={25} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureBtn} onPress={handleCapture} disabled={loading}>
              <Ionicons name="leaf" size={30} color={COLORS.accent} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
              <Ionicons name="images-outline" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'space-between' },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10,20,10,0.35)' },
  permissionScreen: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl, gap: SPACING.md, backgroundColor: COLORS.bg },
  permissionText: { color: COLORS.text, textAlign: 'center', fontSize: 13 },
  permissionBtn: { backgroundColor: COLORS.accent, paddingVertical: 10, paddingHorizontal: 24, borderRadius: RADIUS.md },
  permissionBtnText: { color: COLORS.white, fontWeight: '600' },

  viewfinderWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg },
  viewfinder: {
    width: '90%',
    aspectRatio: 3 / 4,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.8)',
  },
  viewfinderImage: { width: '100%', height: '100%' },
  retakeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  scanningText: { color: COLORS.white, fontSize: 13 },
  error: { color: COLORS.danger, textAlign: 'center', marginBottom: SPACING.md },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  sidePlaceholder: { width: 44, height: 44 },
  captureBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryBtn: {
    width: 50,
    height: 50,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.sm,
  },
  resultThumb: { width: 44, height: 44, borderRadius: RADIUS.sm },
  resultText: { flex: 1, marginLeft: SPACING.sm },
  resultTitle: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  resultSubtitle: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  resultArrow: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});