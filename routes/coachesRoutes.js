import express from 'express';
const router = express.Router()
import { coachesController } from '../controllers/coachesController.js'
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT)


router.get('/', coachesController.getCoaches)
router.get('/:id', coachesController.coachDetail)
router.post('/', coachesController.newCoach)
router.put('/:id', coachesController.updateCoach)
router.delete('/:id', coachesController.deleteCoach)

export default router