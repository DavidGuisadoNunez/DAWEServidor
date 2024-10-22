const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];

if (!fileName) {
  console.error('Por favor, proporciona un nombre para el archivo .js');
  process.exit(1);
}

const filePath = path.join(__dirname, '../files', `${fileName}.js`);

fs.writeFile(filePath, '', (err) => {
  if (err) {
    console.error('Error al crear el archivo:', err);
  } else {
    console.log(`Archivo creado: ${filePath}`);
  }
});