import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrappaer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default router;
