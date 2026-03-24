import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from '@react-native-firebase/analytics';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';

/**
 * Hook to automatically track screen views
 * Use this in your _layout.tsx or individual screens
 */
export function useScreenTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const trackScreen = async () => {
      try {
        // Convert pathname to screen name (e.g., "/result" -> "result_screen")
        const screenName = pathname === '/' ? 'home_screen' : pathname.slice(1).replace(/\//g, '_') + '_screen';

        await logEvent(getAnalytics(), 'screen_view' as any, {
          screen_name: screenName,
          screen_class: screenName,
        });

        console.log('Screen tracked:', screenName);
      } catch (error) {
        // Silently fail if analytics not ready
        console.log('Analytics not ready yet');
      }
    };

    // Small delay to ensure analytics is initialized
    const timer = setTimeout(trackScreen, 500);
    return () => clearTimeout(timer);
  }, [pathname]);
}

/**
 * Hook to track custom events with a simple API
 */
export function useAnalytics() {
    const initAnalytics = async () => {
      const analytics = getAnalytics();
      await setAnalyticsCollectionEnabled(analytics, true);
    };

  const logCustomEvent = async (eventName: string, params?: { [key: string]: any }) => {
    try {
      await logEvent(getAnalytics(), eventName, params);
      console.log('Event logged:', eventName, params);
    } catch (error) {
      console.error('Error logging event:', error);
    }
  };

  const logButtonPress = async (buttonName: string, additionalParams?: { [key: string]: any }) => {
    await logCustomEvent('button_press', { button_name: buttonName, ...additionalParams });
  };

  const logSearchTerm = async (searchTerm: string) => {
    // logSearch is deprecated, use logEvent directly
    await logEvent(getAnalytics(), 'search', { search_term: searchTerm });
    console.log('Search tracked:', searchTerm);
  };

  return { logEvent: logCustomEvent, logButtonPress, logSearch: logSearchTerm, initAnalytics };
}
