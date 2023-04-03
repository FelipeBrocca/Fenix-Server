import express from 'express';
const router = express.Router()
import { clubsController } from '../controllers/clubsController.js'
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT)


router.get('/', clubsController.getClubs)
router.get('/:id', clubsController.clubDetail)
router.post('/', clubsController.newClub)
router.put('/:id', clubsController.updateClub)
router.delete('/:id', clubsController.deleteClub)

export default router