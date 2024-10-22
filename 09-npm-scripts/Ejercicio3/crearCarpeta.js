const fs = require('fs');
const path = require('path');

const folderName = process.argv[2];

if (!folderName) {
  console.error('Por favor, proporciona un nombre para la carpeta');
  process.exit(1);
}

const folderPath = path.join(__dirname, '../files', folderName);

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error al crear la carpeta:', err);
  } else {
    console.log(`Carpeta creada: ${folderPath}`);
  }
});