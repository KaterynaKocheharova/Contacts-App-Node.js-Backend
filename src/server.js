import express from 'express';
import { getEnvVariable } from './utils/env.js';
import { setUpMiddlewares } from './middlewares/middlewares.js';
import { setUpControllers } from './controllers/controllers.js';

export const setUpServer = () => {
  const app = express();
  const PORT = getEnvVariable('PORT', 3000);

  setUpMiddlewares(app);
  setUpControllers(app);

  const logger = setUpMiddlewares(app);

  app.get('*', (req, res) => {
    res.status(404).json({
      message: 'Not found page!',
    });
  });

  // ================= PORT LISTENING

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
