import express from 'express';
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import { financesController } from '../controllers/financesController.js';


router.use(verifyJWT)


router.get('/', financesController.getFinances)
router.get('/:id', financesController.financeDetail)
router.post('/', financesController.newFinance)
router.put('/:id', financesController.updateFinance)
router.delete('/:id', financesController.deleteFinance)

export default router