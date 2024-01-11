import { Router } from 'express';
import cardController from '../controllers/card';

const router = Router();

router.get('/', cardController.getAll);
router.post('/', cardController.create);
// router.get('/quizz', cardController.getQuizz);
// router.patch('/:id/awnser', cardController.awnser);

export default router;
