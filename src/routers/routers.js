import { Router } from 'express';
import { tryCatchWrapper } from '../utils/tryCatchWrappaer.js';
import {
  findContactsController,
  findContactByIdController,
} from '../controllers/controllers.js';

const router = Router();
export default router;

router.get('/contacts', tryCatchWrapper(findContactsController));
router.get('/contacts/:contactId', tryCatchWrapper(findContactByIdController));
