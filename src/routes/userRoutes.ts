import { Router } from 'express';
import { registerUserPage, registerUser, loginUserPage, loginUser } from '../controllers/userController';
import authService from '../services/auth';

const router = Router();

// GET /user/register
router.get('/register', registerUserPage);

// POST /user/register
router.post('/register', registerUser);

// GET /user/login
router.get('/login', loginUserPage);

// POST /user/login
router.post('/login', authService.authenticate('local', {
    failureRedirect: '/user/register'
}), loginUser);


export default router;