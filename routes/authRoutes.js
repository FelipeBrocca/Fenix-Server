import express from 'express';
const router = express.Router()
import {
    login,
    loggedIn, 
    logout
} from '../controllers/authController.js'
import loginLimiter from '../middleware/loginLimiter.js';


router.route('/')
    .post(loginLimiter, login)

router.route('/loggedIn')
    .get(loggedIn)

router.route('/logout')
    .post(logout)

export default router