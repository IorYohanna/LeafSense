import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_600SemiBold_Italic,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

/**
 * Charge les polices utilisees par le theme (voir theme.ts).
 * A appeler une seule fois a la racine de l'app (App.tsx), et attendre
 * `fontsLoaded === true` avant de retirer le splash screen.
 */
export function useAppFonts() {
  const [fontsLoaded] = usePlayfairFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_600SemiBold_Italic,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return fontsLoaded;
}
