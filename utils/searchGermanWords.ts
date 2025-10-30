import { getExactWordFromDatabase } from './database';

export interface ArticleResult {
  word: string;
  article: string;
  fullDisplay: string;
}

export interface FoundWord {
  word: string;
  article: string;
  fullDisplay: string;
}

/**
 * Searches for a specific German word and returns its article
 * @param searchWord - The word to search for
 * @returns FoundWord if found, null if not found
 */
export async function getArticleForWord(searchWord: string): Promise<FoundWord | null> {
  if (!searchWord.trim()) {
    return null;
  }

  try {
    const foundWord = await getExactWordFromDatabase(searchWord.trim());

    if (!foundWord) {
      return null;
    }

    return {
      word: foundWord.word,
      article: foundWord.article,
      fullDisplay: `${getArticleDisplay(foundWord.article)} ${foundWord.word}`
    };
  } catch (error) {
    console.error('Error searching for word:', error);
    return null;
  }
}

/**
 * Converts article abbreviation to full German article
 */
function getArticleDisplay(article: string): string {
  switch (article.toLowerCase()) {
    case 'm':
      return 'der';
    case 'f':
      return 'die';
    case 'n':
      return 'das';
    case 'p':
      return 'die'; // plural
    default:
      return article;
  }
}