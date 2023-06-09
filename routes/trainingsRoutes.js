import express from 'express';
const router = express.Router()
import { trainingsController } from '../controllers/trainingsController.js'
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT)


router.get('/', trainingsController.getTrainings)
router.get('/:id', trainingsController.trainingDetail)
router.post('/', trainingsController.newTraining)
router.put('/:id', trainingsController.updateTraining)
router.delete('/:id', trainingsController.deleteTraining)

export default router