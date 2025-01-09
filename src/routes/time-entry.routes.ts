import { Router } from 'express';
import TimeEntryController from '../controllers/TimeEntryController';

const router = Router();

router.post('/start', TimeEntryController.start);
router.post('/end', TimeEntryController.end);
router.get('/list', TimeEntryController.list);

export default router;
