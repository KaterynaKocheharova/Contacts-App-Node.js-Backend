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

  // ================= PORT LISTENING

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
