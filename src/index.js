import { setUpServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMPLATES_DIR, TEMP_UPLOAD_DIR } from './constants/index.js';

import { logger } from './app.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMPLATES_DIR);
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
     setUpServer();
  } catch(error) {
    logger.info(error);
  }
};

bootstrap();
