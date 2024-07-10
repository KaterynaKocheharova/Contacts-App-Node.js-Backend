import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';


export const setUpMiddlewares = (app) => {

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

  return logger;

};

