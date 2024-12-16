import express from 'express';
import morgan from 'morgan';
import logger from './winston.js';

const PORT = 3001;
const server = express();

/* MIDDLEWARE */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

function logDate (req, res, next) {
  logger.info(`[${new Date().toISOString()}] ${req.path}`);
  next();
}

function logMDW (req, res, next) {
  logger.info('middleware');
  next();
}

function restrictedAccess (req, res, next) {
  const password = req.headers['password'];
  if (password === 'patata') {
    res.status(200).send({ message: 'Bienvenid@, disfrute del contenido' });
  } else {
    res.status(401).send({
      code: 401,
      message: 'Acceso restringido, por favor, incluya la palabra secreta en el parámetro \'password\' en la cabecera de la petición'
    });
  }
}

server.use(logDate);

/* ROUTES */
server.get('/middleware', logMDW, function (req, res) {
  logger.info('controller');
  res.status(200).send({ message: 'middleware' });
});

server.get('/restricted', restrictedAccess);

server.get('/error', function (req, res, next) {
  try {
    throw Error('Boom!');
  } catch (error) {
    next(error);
  }
});
server.use('*', (req, res) => {
  res.status(404).send('Not found');
});
server.use(function (err, req, res, next) {
  const status = err.status || 500;
  logger.error(`[${status}] ${err.message}`);
  res.status(status).send({
    code: status,
    message: 'Server Error'
  });
});

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
