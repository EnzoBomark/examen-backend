import { createHttpTerminator } from 'http-terminator';

import app from './app';
import { kill, debug } from './utils';
import { connectToDatabase } from './database';

const port = process.env.PORT || 9000;

const server = app.listen(port, () => connectToDatabase());

process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', kill);

process.on('SIGTERM', async () => {
  debug('SIGTERM received, closing gracefully ...');
  await createHttpTerminator({ server }).terminate();
});

process.on('SIGINT', async () => {
  debug('SIGINT received, closing gracefully ...');
  await createHttpTerminator({ server }).terminate();
});

export default server;
