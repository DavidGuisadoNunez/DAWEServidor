import express from 'express';
import path from 'path';
const app = express();

app.use(express.static('.')); // Sirve la carpeta actual

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/openapi/openapi.yaml`);
});
