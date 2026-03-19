import { TestIds } from 'react-native-google-mobile-ads';

export const AD_UNIT_IDS = {
  banner: __DEV__ ? TestIds.ADAPTIVE_BANNER : process.env.ADMOB_APP_ID,
};
