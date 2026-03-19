import analytics from '@react-native-firebase/analytics';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Figtree': require('../assets/fonts/Figtree-Medium.ttf'),
    'RibeyeMarrow': require('../assets/fonts/RibeyeMarrow-Regular.ttf'),
    'DynaPuff': require('../assets/fonts/DynaPuff-Medium.ttf'),
  })

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Firebase auto-initializes from GoogleService-Info.plist
        await analytics().setAnalyticsCollectionEnabled(true);
        await analytics().logEvent('app_open', {
          timestamp: new Date().toISOString()
        });
        console.log('Firebase Analytics initialized successfully');
      } catch (err) {
        console.error('Firebase initialization error:', err);
      }
    };
    
    initializeFirebase();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('Google Mobile Ads initialized');
    });

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
              animation: 'slide_from_bottom'
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </PaperProvider>
    </ThemeProvider>
  );
}
