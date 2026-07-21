// Frontend/src/screens/ScanScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
  runAtTargetFps,
} from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { Worklets } from 'react-native-worklets-core';
import { colors, spacing, typography, radius } from '@/theme/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { loadLabels, getModelInputSize } from '@/services/inferenceService';

interface LivePrediction {
  scientificName: string;
  confidence: number;
}

interface RawPrediction {
  index: number;
  confidence: number;
}

const MODEL_ASSET = require('../../assets/model/plant_model.tflite');

export function ScanScreen({ navigation }: any) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const model = useTensorflowModel(MODEL_ASSET);
  const { resize } = useResizePlugin();

  const [labels, setLabels] = useState<string[]>([]);
  const [labelsError, setLabelsError] = useState<string | null>(null);
  const [rawPrediction, setRawPrediction] = useState<RawPrediction | null>(null);
  const [capturing, setCapturing] = useState(false);
  const cameraRef = React.useRef<Camera>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    loadLabels()
      .then(setLabels)
      .catch((e) => setLabelsError(String(e?.message ?? e)));
  }, []);

  // Pont thread frame-processor -> thread JS, pour mettre a jour l'etat React
  // avec la meilleure prediction courante, sans bloquer le rendu de la camera.
  const updateRawPrediction = Worklets.createRunOnJS((index: number, confidence: number) => {
    setRawPrediction({ index, confidence });
  });

  const inputSize = getModelInputSize();
  const actualModel = model.state === 'loaded' ? model.model : undefined;

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      if (actualModel == null) return;

      // Limite l'inference a 2x/seconde : suffisant pour un retour visuel fluide
      // sans saturer le thread camera avec un modele qui tourne a chaque frame.
      runAtTargetFps(2, () => {
        'worklet';

        const resized = resize(frame, {
          scale: { width: inputSize, height: inputSize },
          pixelFormat: 'rgb',
          dataType: 'float32',
        });

        const outputs = actualModel.runSync([resized]);
        const scores = outputs[0] as number[] | Float32Array;

        let bestIndex = 0;
        let bestScore = -1;
        for (let i = 0; i < scores.length; i++) {
          if (scores[i] > bestScore) {
            bestScore = scores[i];
            bestIndex = i;
          }
        }

        updateRawPrediction(bestIndex, bestScore);
      });
    },
    [actualModel, inputSize]
  );

  // Le worklet renvoie un index numerique ; on le convertit ici en nom
  // scientifique via labels.txt, cote JS (le tableau labels n'est pas
  // accessible depuis le thread frame-processor).
  const [displayPrediction, setDisplayPrediction] = useState<LivePrediction | null>(null);
  useEffect(() => {
    if (!rawPrediction || labels.length === 0) return;
    setDisplayPrediction({
      scientificName: labels[rawPrediction.index] ?? 'Espèce inconnue',
      confidence: rawPrediction.confidence,
    });
  }, [rawPrediction, labels]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || !displayPrediction) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePhoto({ flash: 'off' });
      navigation.navigate('Result', {
        photoUri: `file://${photo.path}`,
        scientificName: displayPrediction.scientificName,
        confidence: displayPrediction.confidence,
      });
    } finally {
      setCapturing(false);
    }
  }, [displayPrediction, navigation]);

  if (labelsError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Impossible de charger le modèle ou labels.txt : {labelsError}
        </Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={typography.body}>
          La caméra est nécessaire pour identifier une plante.
        </Text>
        <PrimaryButton
          label="Autoriser la caméra"
          onPress={requestPermission}
          style={{ marginTop: spacing.md }}
        />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.forest} />
        <Text style={typography.bodySecondary}>Recherche de la caméra…</Text>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        frameProcessor={model.state === 'loaded' ? frameProcessor : undefined}
        pixelFormat="yuv"
      />

      <View style={styles.overlayTop}>
        <Text style={styles.eyebrow}>SPÉCIMEN EN COURS D&apos;IDENTIFICATION</Text>
        {model.state !== 'loaded' ? (
          <Text style={styles.liveName}>Chargement du modèle…</Text>
        ) : displayPrediction ? (
          <>
            <Text style={styles.liveName}>{displayPrediction.scientificName}</Text>
            <Text style={styles.liveConfidence}>
              Confiance : {Math.round(displayPrediction.confidence * 100)}%
            </Text>
          </>
        ) : (
          <Text style={styles.liveName}>Vise une plante…</Text>
        )}
      </View>

      <View style={styles.overlayBottom}>
        <PrimaryButton
          label={capturing ? 'Capture…' : 'Scanner cette plante'}
          onPress={handleCapture}
          loading={capturing}
          disabled={!displayPrediction || model.state !== 'loaded'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#000' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
    textAlign: 'center',
  },
  overlayTop: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.overlay,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  eyebrow: {
    ...typography.label,
    color: colors.textOnDark,
    opacity: 0.85,
  },
  liveName: {
    fontFamily: typography.scientificName.fontFamily,
    fontSize: 20,
    color: colors.textOnDark,
    marginTop: spacing.xs,
  },
  liveConfidence: {
    ...typography.bodySecondary,
    color: colors.textOnDark,
    opacity: 0.85,
    marginTop: 2,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
});
