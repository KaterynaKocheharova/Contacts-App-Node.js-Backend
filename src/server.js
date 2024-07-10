import express from 'express';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';
import { getEnvVariable } from './utils/env.js';
import { setUpControllers } from './controllers/controllers.js';

export const setUpServer = () => {
  const app = express();
  const PORT = getEnvVariable('PORT', 3000);

  // ===================== PINO

  const logger = pino({
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

  app.use(pinoMiddleware({ logger }));

  // ==================== CORS

  app.use(cors());

  // =================== SETTING UP CONTROLLERS

  setUpControllers(app);

  // ================= PORT LISTENING

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
