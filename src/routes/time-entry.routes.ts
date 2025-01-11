import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TimeEntryController from '../controllers/TimeEntryController';

const router = Router();

// Aplicando o middleware ensureAuthenticated nas rotas protegidas
router.post('/start', ensureAuthenticated, TimeEntryController.start);
router.post('/end', ensureAuthenticated, TimeEntryController.end);
router.get('/list', ensureAuthenticated, TimeEntryController.list);

export default router;
