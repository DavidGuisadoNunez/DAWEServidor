import fs from 'fs';
import path from 'path';

const notesDir = path.join(process.cwd(), 'src', 'notes');

export const initializeDirectories = () => {
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
    console.log(`Directorio creado: ${notesDir}`);
  }
};
