import express from 'express';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';
import { getEnvVariable } from './utils/env.js';
import { findContacts, findContactById } from './services/contacts.js';

export const setUpServer = () => {
  const app = express();
  const PORT = getEnvVariable('PORT', 3000);

  //   PINO
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

  //   CORS
  app.use(cors());

  //  ROUTE GET CONTACTS

  app.get('/contacts', async (req, res) => {
    const contacts = await findContacts();
    res.status(200).json({
      data: contacts,
    });
  });

  app.get('/contacts:id', async (req, res) => {
    const { id } = req.params;
    const contact = await findContactById(id);
    if (contact) {
      res.status(200).json({
        data: contact,
      });
    } else {
      res.status(404).json({
        message: 'No contact with such id found',
      });
    }
  });

  //   PROCESSING NON-EXISTING PATHS
  app.get('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  //   PORT LISTENING
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
