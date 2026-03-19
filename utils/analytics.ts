import analytics from '@react-native-firebase/analytics';

/**
 * Utility functions for Firebase Analytics tracking
 */

// Log screen views
export const logScreenView = async (screenName: string, screenClass?: string) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  } catch (error) {
    console.error('Error logging screen view:', error);
  }
};

// Log custom events
export const logEvent = async (eventName: string, params?: { [key: string]: any }) => {
  try {
    await analytics().logEvent(eventName, params);
  } catch (error) {
    console.error('Error logging event:', error);
  }
};

// Log when user selects content
export const logSelectContent = async (contentType: string, itemId: string) => {
  try {
    await analytics().logSelectContent({
      content_type: contentType,
      item_id: itemId,
    });
  } catch (error) {
    console.error('Error logging select content:', error);
  }
};

// Log button clicks
export const logButtonClick = async (buttonName: string, location?: string) => {
  try {
    await analytics().logEvent('button_click', {
      button_name: buttonName,
      location: location,
    });
  } catch (error) {
    console.error('Error logging button click:', error);
  }
};

// Log quiz/game results
export const logGameResult = async (result: 'correct' | 'incorrect', word?: string, difficulty?: string) => {
  try {
    await analytics().logEvent('game_result', {
      result,
      word,
      difficulty,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging game result:', error);
  }
};

// Log when user completes a level or achievement
export const logLevelComplete = async (level: number, score?: number) => {
  try {
    await analytics().logLevelEnd({
      level,
      success: true,
      score,
    });
  } catch (error) {
    console.error('Error logging level complete:', error);
  }
};

// Set user properties
export const setUserProperty = async (name: string, value: string) => {
  try {
    await analytics().setUserProperty(name, value);
  } catch (error) {
    console.error('Error setting user property:', error);
  }
};

// Enable/disable analytics collection
export const setAnalyticsEnabled = async (enabled: boolean) => {
  try {
    await analytics().setAnalyticsCollectionEnabled(enabled);
  } catch (error) {
    console.error('Error setting analytics collection:', error);
  }
};

export default {
  logScreenView,
  logEvent,
  logSelectContent,
  logButtonClick,
  logGameResult,
  logLevelComplete,
  setUserProperty,
  setAnalyticsEnabled,
};
