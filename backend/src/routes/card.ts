import { Router } from 'express';
import cardController from '../controllers/card';

const router = Router();

router.get('/', cardController.getAll);
router.post('/', cardController.create);
router.get('/quizz', cardController.quizz);
router.patch('/:id/answer', cardController.answer);

export default router;
