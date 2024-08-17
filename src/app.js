import express from 'express';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';
import routers from './routers/index.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

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
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());
app.use(pinoMiddleware({ logger }));
app.use(cors());
app.use(cookieParser());
app.use(routers);
app.use(notFoundHandler);
app.use(errorHandler);


export default app;
