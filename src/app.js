import express from 'express';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';
import contactsRoutes from './routers/routers.js';
import { errHandler } from './middlewares/errHandler.js';
import {notFoundHandler} from "./middlewares/notFoundHandler.js";

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'req,res,hostname,pid',
      messageFormat: '{msg}',
    },
  },
});

const app = express();
app.use(pinoMiddleware({ logger }));
app.use(cors());
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(contactsRoutes);
app.use(notFoundHandler);
app.use(errHandler);

export default app;
