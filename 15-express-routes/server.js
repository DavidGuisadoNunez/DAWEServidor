import express from 'express';
import router from './routes.js';

const PORT = 3031;
const server = express();

/* MIDDLEWARE */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

/* ROUTES */
server.get('/header', function (req, res) {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      code: 401,
      error: 'Unauthorized',
      message: 'Error: Set a token to login'
    });
  }
  console.log(token);
  res.status(200).send('Token received');
});

server.get('/params/:name', function (req, res) {
  const { name } = req.params;
  res.status(200).send(`Hola ${name}`);
});

server.get('/query', function (req, res) {
  const { n = 100 } = req.query;
  const number = parseInt(n, 10);
  const sum = (number * (number + 1)) / 2;
  res.status(200).send(`Sum of numbers from 1 to ${number} is ${sum}`);
});

server.post('/body', function (req, res) {
  const body = req.body;
  let html = '<ul>';
  for (const key in body) {
    html += `<li>${key}: ${body[key]}</li>`;
  }
  html += '</ul>';
  res.status(200).send(html);
});

server.use('/animals', router);

server.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    error: 'Not Found',
    message: 'Error: Path not found'
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});