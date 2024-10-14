const fs = require('fs');
const path = require('path');
const readline = require('readline');

const notesDir = path.join(__dirname, 'notes');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n--- Editor de Notas ---');
    console.log('1. Crear nueva nota');
    console.log('2. Editar nota existente');
    console.log('3. Eliminar nota');
    console.log('4. Salir');
    rl.question('Selecciona una opción: ', handleMenuSelection);
}

function handleMenuSelection(option) {
    switch (option) {
        case '1':
            createNote();
            break;
        case '2':
            editNote();
            break;
        case '3':
            deleteNote();
            break;
        case '4':
            rl.close();
            break;
        default:
            console.log('Opción no válida. Intenta de nuevo.');
            showMenu();
            break;
    }
}

function createNote() {
    rl.question('Introduce el nombre de la nota (sin extensión): ', (name) => {
        const filePath = path.join(notesDir, `${name}.note`);
        let content = [];
        console.log('Escribe tu nota (deja una línea en blanco para terminar):');

        rl.on('line', (input) => {
            if (input.trim() === '') {
                if (content.length > 0 && content[content.length - 1].trim() === '') {
                    rl.removeAllListeners('line');
                    saveNote(filePath, content);
                } else {
                    content.push(input);
                }
            } else {
                content.push(input);
            }
        });
    });
}

function saveNote(filePath, content) {
    fs.writeFile(filePath, content.join('\n'), (err) => {
        if (err) {
            console.error('Error al guardar la nota:', err);
        } else {
            console.log('Nota guardada con éxito.');
        }
        showMenu();
    });
}

function editNote() {
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            console.error('Error al leer las notas:', err);
            return showMenu();
        }
        const notes = files.filter(file => file.endsWith('.note'));
        if (notes.length === 0) {
            console.log('No hay notas disponibles para editar.');
            return showMenu();
        }

        console.log('Notas disponibles:');
        notes.forEach((note, index) => {
            console.log(`${index + 1}. ${note.replace('.note', '')}`);
        });

        rl.question('Selecciona una nota para editar (número): ', (number) => {
            const noteIndex = parseInt(number) - 1;
            if (noteIndex >= 0 && noteIndex < notes.length) {
                const filePath = path.join(notesDir, notes[noteIndex]);
                editExistingNote(filePath);
            } else {
                console.log('Selección no válida.');
                showMenu();
            }
        });
    });
}

function editExistingNote(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer la nota:', err);
            return showMenu();
        }

        console.log('Contenido actual de la nota:');
        console.log(data);
        console.log('Escribe el nuevo contenido (deja una línea en blanco para terminar):');

        let content = data.split('\n');
        rl.on('line', (input) => {
            if (input.trim() === '') {
                if (content.length > 0 && content[content.length - 1].trim() === '') {
                    rl.removeAllListeners('line');
                    saveNote(filePath, content);
                } else {
                    content.push(input);
                }
            } else {
                content.push(input);
            }
        });
    });
}

function deleteNote() {
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            console.error('Error al leer las notas:', err);
            return showMenu();
        }
        const notes = files.filter(file => file.endsWith('.note'));
        if (notes.length === 0) {
            console.log('No hay notas disponibles para eliminar.');
            return showMenu();
        }

        console.log('Notas disponibles:');
        notes.forEach((note, index) => {
            console.log(`${index + 1}. ${note.replace('.note', '')}`);
        });

        rl.question('Selecciona una nota para eliminar (número): ', (number) => {
            const noteIndex = parseInt(number) - 1;
            if (noteIndex >= 0 && noteIndex < notes.length) {
                const filePath = path.join(notesDir, notes[noteIndex]);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la nota:', err);
                    } else {
                        console.log('Nota eliminada con éxito.');
                    }
                    showMenu();
                });
            } else {
                console.log('Selección no válida.');
                showMenu();
            }
        });
    });
}

// Iniciar el editor
showMenu();