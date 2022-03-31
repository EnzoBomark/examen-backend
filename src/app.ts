import 'dotenv/config';
import 'express-async-errors';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import cors from 'cors';
import express, { Express } from 'express';

const origin = { origin: process.env.CLIENT_URL || '' };

const app: Express = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get('/api/health', (_, res) => res.send({ message: 'OK' }));

app.use(cors(origin));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Sentry.Handlers.errorHandler());

export default app;
