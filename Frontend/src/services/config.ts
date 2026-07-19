// IMPORTANT : le telephone et le backend doivent etre sur le meme reseau Wi-Fi.
// Remplace 192.168.1.X par l'IP locale de la machine qui fait tourner le backend
// (jamais "localhost", qui pointerait vers le telephone lui-meme).
// Sur Mac/Linux : `ifconfig | grep inet`. Sur Windows : `ipconfig`.
export const API_BASE_URL = 'http://192.168.1.170:8080/api';
