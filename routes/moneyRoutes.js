import express from 'express';
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import {moneyController} from '../controllers/moneyController.js'

router.use(verifyJWT)


router.get('/', moneyController.getMoney)
router.get('/:id', moneyController.moneyDetail)
router.post('/', moneyController.newMoney)
router.put('/:id', moneyController.updateMoney)
router.delete('/:id', moneyController.deleteMoney)

export default router