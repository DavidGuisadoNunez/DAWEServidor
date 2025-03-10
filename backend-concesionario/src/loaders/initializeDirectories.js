import fs from 'fs';

const directories = []; // Si es intencionalmente vacío, se podría eliminar directamente.

export const initializeDirectories = () => {
  if (directories.length === 0) {
    console.warn('⚠️ No directories to initialize.');
    return;
  }

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Directorio creado: ${dir}`);
    }
  });
};
