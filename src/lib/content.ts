import fs from 'fs';
import path from 'path';

// Note: We point to 'src/content' now
const contentDirectory = path.join(process.cwd(), 'src/content');

export function getContent(fileName: string) {
  const fullPath = path.join(contentDirectory, `${fileName}.json`);
  if (!fs.existsSync(fullPath)) return { sections: [] };
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}