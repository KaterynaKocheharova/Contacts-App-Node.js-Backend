import { Router } from 'express';
import {
  findContactsController,
  findContactByIdController,
} from '../controllers/controllers.js';

const router = Router();
export default router;

router.get('/contacts', findContactsController);
router.get('/contacts/:contactId', findContactByIdController);
