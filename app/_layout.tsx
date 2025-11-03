import { DarkTheme, DefaultTheme as NavDefaultTheme, ThemeProvider } from '@react-navigation/native';
import mobileAds from 'react-native-google-mobile-ads';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Figtree': require('../assets/fonts/Figtree-Medium.ttf'),
    'RibeyeMarrow': require('../assets/fonts/RibeyeMarrow-Regular.ttf'),
    'DynaPuff': require('../assets/fonts/DynaPuff-Medium.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  // useEffect(() => {
  //   mobileAds()
  //     .initialize()
  //     .then(adapterStatuses => {
  //       console.log('Google Mobile Ads initialized');
  //     });
  // }, []);

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-your-real-id';


  const paperTheme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      // Map all the font variants Paper uses
      default: { ...DefaultTheme.fonts.default, fontFamily: 'Figtree' },
      bodySmall: { ...DefaultTheme.fonts.bodySmall, fontFamily: 'Figtree' },
      bodyMedium: { ...DefaultTheme.fonts.bodyMedium, fontFamily: 'Figtree' },
      bodyLarge: { ...DefaultTheme.fonts.bodyLarge, fontFamily: 'Figtree' },
      labelSmall: { ...DefaultTheme.fonts.labelSmall, fontFamily: 'Figtree' },
      labelMedium: { ...DefaultTheme.fonts.labelMedium, fontFamily: 'Figtree' },
      labelLarge: { ...DefaultTheme.fonts.labelLarge, fontFamily: 'Figtree' },
    }
  };


  
  return (
    <ThemeProvider value={DarkTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen 
            name='index' 
            options={{ 
              headerShown: false,
              title: 'Search',
              animation: 'fade'
            }} 
          />
          <Stack.Screen 
            name='result' 
            options={{ 
              headerShown: false,
              title: 'Result',
              animation: 'fade'
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </PaperProvider>
    </ThemeProvider>
  );
}
