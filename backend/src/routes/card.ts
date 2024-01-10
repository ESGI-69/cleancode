import { Router } from 'express';
import recipeController from '../controllers/card';

const router = Router();

router.get('/', recipeController.getAll);
router.post('/', recipeController.create);
// router.get('/quizz', recipeController.getQuizz);
// router.patch('/:id/awnser', recipeController.awnser);

export default router;
