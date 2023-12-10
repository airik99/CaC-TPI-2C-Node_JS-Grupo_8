import { Router } from 'express'
const router = Router()
import authControllers from '../controllers/authController.js';

router.get('/login', authControllers.loginget);
router.post('/login', authControllers.loginpost);
router.get('/register', authControllers.registerget);
router.post('/register', authControllers.registerpost);
router.get('/logout', authControllers.logoutget);
router.post('/logout', authControllers.logoutpost);

export default router;