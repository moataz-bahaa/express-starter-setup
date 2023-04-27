import { Router } from 'express';
import { loginByEmail, registerByEmail } from '../controllers/auth.js';

const router = Router();

router.post('/register/email', registerByEmail);

router.post('/login/email', loginByEmail);

export default router;
