import { Router } from 'express';
import { handleContactSubmit, getAllSubmissions } from '../controllers/contactController.js';

const router = Router();

router.post('/', handleContactSubmit);
router.get('/', getAllSubmissions);

export default router;