// import fs from 'fs';
// import path from 'path';
// import readline from 'readline';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import express from 'express';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const notesDir = path.join(__dirname, 'notes');

// if (!fs.existsSync(notesDir)) {
//     fs.mkdirSync(notesDir);
// }

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Obtener argumentos de la línea de comandos
// const args = process.argv.slice(2);
// const selectedOption = args[0] || null;
// const noteName = args[1] || null; // Para el nombre de la nota

// function showMenu() {
//     console.log('\n--- Editor de Notas ---');
//     console.log('1. Crear nueva nota');
//     console.log('2. Editar nota existente');
//     console.log('3. Eliminar nota');
//     console.log('4. Salir');
//     rl.question('Selecciona una opción: ', handleMenuSelection);
// }

// function handleMenuSelection(option) {
//     switch (option) {
//         case '1':
//             if (noteName) {
//                 createNoteWithName(noteName);
//             } else {
//                 createNote();
//             }
//             break;
//         case '2':
//             editNote();
//             break;
//         case '3':
//             deleteNote();
//             break;
//         case '4':
//             console.log('Saliendo del programa...');
//             rl.close();
//             process.exit(0); // Detenemos el proceso manualmente
//             break;
//         default:
//             console.log('Opción no válida. Intenta de nuevo.');
//             showMenu();
//             break;
//     }
// }


// function createNote() {
//     rl.question('Introduce el nombre de la nota (sin extensión): ', (name) => {
//         const filePath = path.join(notesDir, `${name}.note`);
//         let content = [];
//         console.log('Escribe tu nota (deja una línea en blanco para terminar):');

//         rl.on('line', (input) => {
//             if (input.trim() === '') {
//                 if (content.length > 0 && content[content.length - 1].trim() === '') {
//                     rl.removeAllListeners('line');
//                     saveNote(filePath, content);
//                 } else {
//                     content.push(input);
//                 }
//             } else {
//                 content.push(input);
//             }
//         });
//     });
// }

// function createNoteWithName(name) {
//     const filePath = path.join(notesDir, `${name}.note`);
//     let content = [];
//     console.log('Escribe tu nota (deja una línea en blanco para terminar):');

//     rl.on('line', (input) => {
//         if (input.trim() === '') {
//             if (content.length > 0 && content[content.length - 1].trim() === '') {
//                 rl.removeAllListeners('line');
//                 saveNote(filePath, content);
//             } else {
//                 content.push(input);
//             }
//         } else {
//             content.push(input);
//         }
//     });
// }

// function saveNote(filePath, content) {
//     fs.writeFile(filePath, content.join('\n'), (err) => {
//         if (err) {
//             console.error('Error al guardar la nota:', err);
//         } else {
//             console.log('Nota guardada con éxito.');
//         }
//         showMenu();
//     });
// }

// function editNote() {
//     fs.readdir(notesDir, (err, files) => {
//         if (err) {
//             console.error('Error al leer las notas:', err);
//             return showMenu();
//         }
//         const notes = files.filter(file => file.endsWith('.note'));
//         if (notes.length === 0) {
//             console.log('No hay notas disponibles para editar.');
//             return showMenu();
//         }

//         console.log('Notas disponibles:');
//         notes.forEach((note, index) => {
//             console.log(`${index + 1}. ${note.replace('.note', '')}`);
//         });

//         rl.question('Selecciona una nota para editar (número): ', (number) => {
//             const noteIndex = parseInt(number) - 1;
//             if (noteIndex >= 0 && noteIndex < notes.length) {
//                 const filePath = path.join(notesDir, notes[noteIndex]);
//                 editExistingNote(filePath);
//             } else {
//                 console.log('Selección no válida.');
//                 showMenu();
//             }
//         });
//     });
// }

// function editExistingNote(filePath) {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error al leer la nota:', err);
//             return showMenu();
//         }

//         console.log('Contenido actual de la nota:');
//         console.log(data);
//         console.log('Escribe el nuevo contenido (deja una línea en blanco para terminar):');

//         let content = data.split('\n');
//         rl.on('line', (input) => {
//             if (input.trim() === '') {
//                 if (content.length > 0 && content[content.length - 1].trim() === '') {
//                     rl.removeAllListeners('line');
//                     saveNote(filePath, content);
//                 } else {
//                     content.push(input);
//                 }
//             } else {
//                 content.push(input);
//             }
//         });
//     });
// }

// function deleteNote() {
//     fs.readdir(notesDir, (err, files) => {
//         if (err) {
//             console.error('Error al leer las notas:', err);
//             return showMenu();
//         }
//         const notes = files.filter(file => file.endsWith('.note'));
//         if (notes.length === 0) {
//             console.log('No hay notas disponibles para eliminar.');
//             return showMenu();
//         }

//         console.log('Notas disponibles:');
//         notes.forEach((note, index) => {
//             console.log(`${index + 1}. ${note.replace('.note', '')}`);
//         });

//         rl.question('Selecciona una nota para eliminar (número): ', (number) => {
//             const noteIndex = parseInt(number) - 1;
//             if (noteIndex >= 0 && noteIndex < notes.length) {
//                 const filePath = path.join(notesDir, notes[noteIndex]);
//                 fs.unlink(filePath, (err) => {
//                     if (err) {
//                         console.error('Error al eliminar la nota:', err);
//                     } else {
//                         console.log('Nota eliminada con éxito.');
//                     }
//                     showMenu();
//                 });
//             } else {
//                 console.log('Selección no válida.');
//                 showMenu();
//             }
//         });
//     });
// }

// // Iniciar el editor
// if (selectedOption) {
//     handleMenuSelection(selectedOption);
// } else {
//     showMenu();
// }


// const app = express();
// const PORT = 3100;

// app.use(express.json());

// app.get('/notes', (req, res) => {
//     fs.readdir(notesDir, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error al leer las notas' });
//         }
//         const notes = files.filter(file => file.endsWith('.note')).map(file => file.replace('.note', ''));
//         res.json(notes);
//     });
// });

// app.get('/notes/:name', (req, res) => {
//     const noteName = req.params.name;
//     const filePath = path.join(notesDir, `${noteName}.note`);
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(404).json({ error: 'Nota no encontrada' });
//         }
//         res.json({ name: noteName, content: data });
//     });
// });

// app.post('/notes', (req, res) => {
//     const { name, content } = req.body;
//     if (!name || !content) {
//         return res.status(400).json({ error: 'Nombre y contenido son requeridos' });
//     }
//     const filePath = path.join(notesDir, `${name}.note`);
//     fs.writeFile(filePath, content, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error al guardar la nota' });
//         }
//         res.status(201).json({ message: 'Nota creada con éxito' });
//     });
// });

// app.put('/notes/:name', (req, res) => {
//     const noteName = req.params.name;
//     const { content } = req.body;
//     if (!content) {
//         return res.status(400).json({ error: 'Contenido es requerido' });
//     }
//     const filePath = path.join(notesDir, `${noteName}.note`);
//     fs.writeFile(filePath, content, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error al actualizar la nota' });
//         }
//         res.json({ message: 'Nota actualizada con éxito' });
//     });
// });

// app.delete('/notes/:name', (req, res) => {
//     const noteName = req.params.name;
//     const filePath = path.join(notesDir, `${noteName}.note`);
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error al eliminar la nota' });
//         }
//         res.json({ message: 'Nota eliminada con éxito' });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });






import express from 'express';
import path from 'path';
import fs from 'fs';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = 3100;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notesDir = path.join(__dirname, '..', 'notes');

// Middleware para parsear JSON
app.use(express.json());

// Usamos las rutas definidas en `notesRoutes.js`
app.use('/api/notes', notesRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});