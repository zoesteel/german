export interface GermanWordData {
  word: string;
  article: string;
}

let cachedData: GermanWordData[] | null = null;

/**
 * Loads and parses the German words CSV data
 * Returns cached data on subsequent calls for performance
 */
export async function fetchGermanWordsData(): Promise<GermanWordData[]> {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Import JSON data directly - much more reliable in React Native
    const data: GermanWordData[] = require('../assets/data/articles.json');
    cachedData = data;
    return cachedData;
  } catch (error) {
    console.error('Failed to fetch German words:', error);
    return [];
  }
}