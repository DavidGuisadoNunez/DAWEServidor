const fs = require('fs');

try {
    const data = fs.readFileSync('leerFichero.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error('Error al leer el fichero:', err);
}