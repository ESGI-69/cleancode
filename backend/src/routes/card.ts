import { Router } from 'express';
import recipeController from '../controllers/card';

const router = Router();

router.get('/', recipeController.getAll);

export default router;
