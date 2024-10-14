const fs = require('fs');

// Verificamos si se pasó el nombre del archivo como argumento
if (process.argv.length < 3) {
    console.log('Por favor, proporciona el nombre del archivo como argumento.');
    process.exit(1);
}

// Obtenemos el nombre del archivo de los argumentos
const nombreArchivo = process.argv[2];

// Leemos el archivo
fs.readFile(nombreArchivo, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }
    // Imprimimos el contenido del archivo
    console.log(data);
});