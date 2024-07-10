import express from 'express';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import cors from 'cors';
import { getEnvVariable } from './utils/env.js';
import { findContacts, findContactById } from './services/contacts.js';

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

  //  ROUTE GET CONTACTS

  app.get('/contacts', async (req, res) => {
    const contacts = await findContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  // =================== ROUTE GET CONTACT BY ID

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'No contact with such id found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  });

  // ================= PROCESSING NON-EXISTING PATHS

  app.get('*', (req, res) => {
    res.status(404).json({
      message: 'Contact not found!',
    });
  });

  // ================= PORT LISTENING

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
