import fs from 'fs';

const directories = [
  'logs',
  'uploads',
  'temp',
];

export const initializeDirectories = (dirs = directories) => {
  if (!dirs.length) {
    console.warn('⚠️ No hay directorios para inicializar.');
    return;
  }

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Directorio creado: ${dir}`);
    }
  });
};
