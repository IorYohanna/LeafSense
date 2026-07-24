// Frontend/src/services/config.ts

// L'IP locale codée en dur cassait dès que le réseau Wi-Fi ou la machine de dev
// changeait. EXPO_PUBLIC_API_URL permet de la surcharger sans toucher au code
// (ex: EXPO_PUBLIC_API_URL=http://192.168.1.42:8081/api dans un fichier .env,
// ou passé directement à `expo start`). La valeur ci-dessous reste un simple
// fallback de dev.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.1.170:8081/api';
