import express from 'express';
const router = express.Router()
import { playersController } from '../controllers/playersController.js'


router.get('/', playersController.getPlayers)
router.get('/:id', playersController.playerDetail)
router.post('/', playersController.newPlayer)
router.put('/:id', playersController.updatePlayer)
router.delete('/:id', playersController.deletePlayer)

export default router