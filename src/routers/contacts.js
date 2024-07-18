import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrappaer.js';
import {
  findContactsController,
  findContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController
} from '../controllers/contacts.js';

const router = Router();
export default router;

router.get('/contacts', ctrlWrapper(findContactsController));
router.get('/contacts/:contactId', ctrlWrapper(findContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
