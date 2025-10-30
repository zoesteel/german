import * as SQLite from 'expo-sqlite';

export interface GermanWordData {
  word: string;
  article: string;
}

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the database and create the words table
 */
export async function initializeDatabase(): Promise<void> {
  if (db) return; // Already initialized

  try {
    db = await SQLite.openDatabaseAsync('german_words.db');
    
    // Create the words table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        article TEXT NOT NULL
      );
    `);

    // Create a metadata table to track migration version
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS migration_info (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Check if database has the real CSV data (not test data)
 */
export async function hasRealData(): Promise<boolean> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db!.getFirstAsync(
      'SELECT value FROM migration_info WHERE key = ?',
      ['data_source']
    );
    return (result as any)?.value === 'real_csv';
  } catch (error) {
    console.error('Error checking data source:', error);
    return false;
  }
}

/**
 * Mark database as having real CSV data
 */
export async function markAsRealData(): Promise<void> {
  if (!db) await initializeDatabase();
  
  try {
    await db!.runAsync(
      'INSERT OR REPLACE INTO migration_info (key, value) VALUES (?, ?)',
      ['data_source', 'real_csv']
    );
    console.log('Database marked as having real CSV data');
  } catch (error) {
    console.error('Error marking real data:', error);
    throw error;
  }
}

/**
 * Check if database has any data
 */
export async function isDatabasePopulated(): Promise<boolean> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db!.getFirstAsync('SELECT COUNT(*) as count FROM words');
    return (result as any)?.count > 0;
  } catch (error) {
    console.error('Error checking database population:', error);
    return false;
  }
}

/**
 * Get exact word match from database
 */
export async function getExactWordFromDatabase(word: string): Promise<GermanWordData | null> {
  if (!db) await initializeDatabase();

  try {
    const result = await db!.getFirstAsync(
      'SELECT word, article FROM words WHERE LOWER(word) = LOWER(?)',
      [word]
    );
    return result as GermanWordData | null;
  } catch (error) {
    console.error('Error getting exact word:', error);
    return null;
  }
}

/**
 * Clear all data from the database (for testing/reset purposes)
 */
export async function clearDatabase(): Promise<void> {
  if (!db) await initializeDatabase();
  
  try {
    await db!.execAsync('DELETE FROM words');
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
}

/**
 * Insert words into database (used during migration)
 */
export async function insertWords(words: GermanWordData[]): Promise<void> {
  if (!db) await initializeDatabase();

  try {
    // Use transaction for better performance
    await db!.withTransactionAsync(async () => {
      const statement = await db!.prepareAsync(
        'INSERT INTO words (word, article) VALUES (?, ?)'
      );

      for (const wordData of words) {
        await statement.executeAsync([wordData.word, wordData.article]);
      }

      await statement.finalizeAsync();
    });

    console.log(`Inserted ${words.length} words into database`);
  } catch (error) {
    console.error('Error inserting words:', error);
    throw error;
  }
}