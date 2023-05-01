import { Router } from 'express';
import {
  loginByEmail,
  loginByFacebook,
  registerByEmail,
  registerByFacebook,
} from '../controllers/auth.js';

const router = Router();

router.post('/register/email', registerByEmail);

router.post('/login/email', loginByEmail);

router.get('/facebook/register', registerByFacebook);

router.get('/facebook/login', loginByFacebook);

export default router;
