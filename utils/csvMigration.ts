import Papa from 'papaparse';
import { csvData } from './csvData';
import {
  clearDatabase,
  GermanWordData,
  hasRealData,
  initializeDatabase,
  insertWords,
  isDatabasePopulated,
  markAsRealData
} from './database';

/**
 * Migrate data from CSV to SQLite database
 * This runs once when the app first starts
 */
export async function migrateCsvToDatabase(): Promise<boolean> {
  try {
    console.log('Checking if database migration is needed...');
    
    // Initialize database first
    await initializeDatabase();
    
    // Check if we already have real CSV data
    const hasRealCsvData = await hasRealData();
    if (hasRealCsvData) {
      console.log('Database already has real CSV data, skipping migration');
      return true;
    }

    // If we have any data but it's not marked as real data, clear it
    const hasAnyData = await isDatabasePopulated();
    if (hasAnyData && !hasRealCsvData) {
      console.log('Database has test data, clearing and importing real CSV data...');
      await clearDatabase();
    }

    console.log('Starting CSV migration...');
    
    // Parse CSV data directly with PapaParse
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true
    });
    
    // Convert to our database format (CSV has 'art' column, we need 'article')
    const germanWords = parsed.data.map((row: any) => ({
      word: row.word,
      article: row.art
    }));
    
    console.log(`Parsed ${germanWords.length} words from CSV data`);

    // Insert data into database in batches (for better performance)
    const batchSize = 1000;
    for (let i = 0; i < germanWords.length; i += batchSize) {
      const batch = germanWords.slice(i, i + batchSize);
      await insertWords(batch as GermanWordData[]);
      
      // Show progress for large datasets
      if (i % 10000 === 0) {
        console.log(`Inserted ${i + batch.length} / ${germanWords.length} words...`);
      }
    }

    // Mark that we now have real CSV data
    await markAsRealData();

    console.log('CSV migration completed successfully!');
    return true;
    
  } catch (error) {
    console.error('CSV migration failed:', error);
    return false;
  }
}