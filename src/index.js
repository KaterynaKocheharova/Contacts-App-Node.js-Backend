import { setUpServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const initAll = async () => {
  await initMongoConnection();
  setUpServer();
};

initAll();
