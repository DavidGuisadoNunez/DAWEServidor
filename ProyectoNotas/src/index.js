import app from './app.js';
import logger from './config/winston.js';

const PORT = 3100;

app.listen(PORT, () => {
  logger.info(`Servidor escuchando en http://localhost:${PORT}`);
});
