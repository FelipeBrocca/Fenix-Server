import express from 'express';
const router = express.Router()
import { usersController } from '../controllers/usersController.js'
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT)

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)


export default router