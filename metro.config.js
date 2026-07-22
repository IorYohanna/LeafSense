import { getDefaultConfig } from 'expo/metro-config';
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('tflite');
export default config;