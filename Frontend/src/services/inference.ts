import * as ImageManipulator from 'expo-image-manipulator';
import jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import { LABELS } from '../constants/labels';

export interface InferenceResult {
  label: string;
  confidence: number;
}

export async function runInference(uri: string, model: any): Promise<InferenceResult> {
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

  const outputs = model.runSync([input.buffer]);
  const scores = new Float32Array(outputs[0] as ArrayBuffer);

  let maxIndex = 0;
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[maxIndex]) maxIndex = i;
  }

  return {
    label: LABELS[maxIndex].trim(),
    confidence: scores[maxIndex],
  };
}