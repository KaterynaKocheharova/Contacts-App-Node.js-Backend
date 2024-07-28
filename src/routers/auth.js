import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrappaer.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

export default router;
