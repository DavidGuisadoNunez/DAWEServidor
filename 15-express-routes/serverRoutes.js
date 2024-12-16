import express from 'express';

import userRouter from './routes.js';

const PORT = 3001;
const server = express();

/* MIDDLEWARE */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

/* ROUTES */
server.use('/users', userRouter);

server.use('*', (req, res) => {
  res.status(404).send('Not found');
});

server.listen(PORT, () => {
  console.log(`Server listenting in port ${PORT}`);
});
