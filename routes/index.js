import { Router } from 'express';
import authRoutes from './auth.js';
// import gameRoutes from './game.js';
// import itemRoutes from './item.js';
// import userRoutes from './user.js';
// import adminRoutes from './admin.js';

const router = Router();

router.use('/auth', authRoutes);


export default router