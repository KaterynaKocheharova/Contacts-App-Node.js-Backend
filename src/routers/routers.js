import { Router } from 'express';
import { tryCatchWrapper } from '../utils/tryCatchWrappaer.js';
import {
  findContactsController,
  findContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController
} from '../controllers/controllers.js';

const router = Router();
export default router;

router.get('/contacts', tryCatchWrapper(findContactsController));
router.get('/contacts/:contactId', tryCatchWrapper(findContactByIdController));
router.post('/contacts', tryCatchWrapper(createContactController));
router.delete('/contacts/:contactId', tryCatchWrapper(deleteContactController));
router.put('/contacts/:contactId', tryCatchWrapper(upsertContactController));
