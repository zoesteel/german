# Firebase Analytics Setup Guide

## Overview
Firebase Analytics has been set up in your app with automatic screen tracking and reusable utility functions.

## What's Configured

### 1. Automatic Screen Tracking
The app now automatically tracks all screen views using the `useScreenTracking()` hook in `_layout.tsx`.

### 2. Utility Files Created

- **`utils/analytics.ts`** - Standalone analytics functions
- **`hooks/use-analytics.ts`** - React hooks for analytics

## Usage Examples

### Basic Event Logging

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

function MyComponent() {
  const { logEvent, logButtonPress, logSearch } = useAnalytics();

  const handleButtonClick = async () => {
    await logButtonPress('submit_answer', {
      word: 'der',
      correct: true
    });
  };

  const handleSearch = async (term: string) => {
    await logSearch(term);
  };

  return (
    <button onClick={handleButtonClick}>Submit</button>
  );
}
```

### Using Standalone Functions

```tsx
import { logEvent, logGameResult, logButtonClick } from '@/utils/analytics';

// Log a custom event
await logEvent('word_revealed', {
  word: 'die Katze',
  gender: 'feminine',
});

// Log button clicks
await logButtonClick('hint_button', 'game_screen');
```

### Track Search Queries

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

function SearchComponent() {
  const { logSearch } = useAnalytics();
  
  const handleSearch = async (searchTerm: string) => {
    // Your search logic here
    await logSearch(searchTerm);
  };
}
```

### Set User Properties

```tsx
import { setUserProperty } from '@/utils/analytics';
```

## Common Events to Track

For your German learning app, consider tracking:

1. **Word Lookups**
```tsx
await logEvent('word_lookup', {
  word: searchTerm,
  gender: result.gender,
  timestamp: Date.now()
});
```

## Privacy & GDPR Compliance

To respect user privacy:

```tsx
import { setAnalyticsEnabled } from '@/utils/analytics';

// Disable analytics if user opts out
await setAnalyticsEnabled(false);

// Enable analytics
await setAnalyticsEnabled(true);
```

## Viewing Analytics Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Analytics → Events
4. View real-time and historical data

## Events Currently Tracked

- **app_open** - When the app launches
- **screen_view** - Automatic tracking for all screens
- Any custom events you add using the utilities

## Next Steps

1. Add event tracking to key user interactions
2. Set up custom conversions in Firebase Console
3. Create audiences based on user behavior
4. Set up BigQuery export for advanced analysis (optional)
