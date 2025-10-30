const fs = require('fs');

// Read the CSV file and create a TypeScript/JavaScript file that exports it as a string
const csvData = fs.readFileSync('./assets/data/articles.csv', 'utf8');

// Create a TypeScript file that exports the CSV data as a string
const tsContent = `// Auto-generated file - do not edit manually
export const csvData = \`${csvData.replace(/`/g, '\\`')}\`;
`;

fs.writeFileSync('./utils/csvData.ts', tsContent);

console.log('CSV data bundled as TypeScript module');
console.log('File saved as: utils/csvData.ts');