const fs = require('fs');

fs.readFile('leerFichero.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el fichero:', err);
        return;
    }
    console.log(data);
});