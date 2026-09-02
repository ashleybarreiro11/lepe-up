import { useCallback } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useSora,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
} from '@expo-google-fonts/sora';
import {
  useFonts as usePlex,
  IBMPlexSans_300Light,
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
} from '@expo-google-fonts/ibm-plex-sans';
import { AppProvider } from '../src/state/AppContext';
import { colors } from '../src/theme/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [soraLoaded] = useSora({ Sora_300Light, Sora_400Regular, Sora_500Medium, Sora_600SemiBold });
  const [plexLoaded] = usePlex({
    IBMPlexSans_300Light,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  const onLayout = useCallback(async () => {
    if (soraLoaded && plexLoaded) await SplashScreen.hideAsync();
  }, [soraLoaded, plexLoaded]);

  if (!soraLoaded || !plexLoaded) return null;

  return (
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: colors.screenBg }} onLayout={onLayout}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.screenBg } }} />
      </View>
    </AppProvider>
  );
}
