import express from 'express';
const router = express.Router()
import { playersController } from '../controllers/playersController.js'


router.get('/', playersController.getPlayers)
router.get('/:id', playersController.playerDetail)
router.post('/', playersController.newPlayer)

export default router