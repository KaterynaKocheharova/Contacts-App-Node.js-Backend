import express from 'express';
import { getEnvVariable } from './utils/env.js';
import { setUpMiddlewares } from './middlewares/middlewares.js';
import studentsRouter from './routers/routers.js';

export const setUpServer = () => {
  const app = express();
  const PORT = getEnvVariable('PORT', 3000);

  setUpMiddlewares(app);

  const logger = setUpMiddlewares(app);

  app.use(studentsRouter);

  app.get('*', (req, res) => {
    res.status(404).json({
      message: 'Not found page!',
    });
  });

  const buildErrorMessage = (error) => {
    if (error.message.includes('Cast to ObjectId failed')) {
      return 'Contact with the given id not found';
    }
    // Add more cases as needed
    switch (error.message) {
      // Add specific cases if there are any other known error messages
      default:
        return 'An unexpected error occurred';
    }
  };

  app.use((error, req, res, next) => {
    const message = buildErrorMessage(error);
    res.status(500).send({
      error: message,
    });
  });

  // ================= PORT LISTENING

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
