import express from 'express';
const app = express();
const PORT = 3015;

// Ruta para la página principal
app.get('/page', (req, res) => {
  res.status(200).send('<h1>Página web</h1><p>Bienvenido a la página web.</p>');
});

// Ruta para manejar el error 404
app.get('/error', (req, res) => {
  res.status(404).send('<h1>Error 404</h1><p>La página que estás buscando no existe.</p>');
});

// Ruta para saludar al usuario
app.get('/greet', (req, res) => {
  const name = req.query.name || 'invitado'; // Obtiene el parámetro name
  res.status(200).send(`<h1>Hello ${name}!</h1>`); // Saludo con el nombre proporcionado
});

// Ruta para el FizzBuzz
app.get('/fizzbuzz', (req, res) => {
  const number = parseInt(req.query.number) || 10; // Obtiene el número del query string
  const fizzbuzzResult = [];

  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      fizzbuzzResult.push('FizzBuzz');
    } else if (i % 3 === 0) {
      fizzbuzzResult.push('Fizz');
    } else if (i % 5 === 0) {
      fizzbuzzResult.push('Buzz');
    } else {
      fizzbuzzResult.push(i);
    }
  }

  res.status(200).json(fizzbuzzResult); // Respuesta en formato JSON
});

// Ruta para manejar cualquier otra página no encontrada
app.use((req, res) => {
  res.status(404).send('<h1>Página no encontrada</h1>');
});

// Escuchar en el puerto 3005
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
