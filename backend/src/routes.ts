import { Router } from 'express';
import cardRoutes from './routes/card';

const router = Router();
router.use('/cards', cardRoutes);

export default router;
