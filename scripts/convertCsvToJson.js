const fs = require('fs');
const Papa = require('papaparse');

// Read the CSV file
const csvData = fs.readFileSync('./assets/data/articles.csv', 'utf8');

// Parse CSV
const parsed = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true
});

// Convert to the format our database expects
const germanWords = parsed.data.map(row => ({
  word: row.word,
  article: row.art
}));

// Write to JSON file
fs.writeFileSync('./assets/data/articles-converted.json', JSON.stringify(germanWords, null, 2));

console.log(`Converted ${germanWords.length} words to JSON format`);
console.log('File saved as: assets/data/articles-converted.json');