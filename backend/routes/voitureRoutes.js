import express from "express"
const router=express.Router()
import {getVoitureById,
     createVoitureReview, getVoitures} from '../controllers/voitureController.js'

import { protect} from '../middelware/authMiddleware.js'

router.route('/').get(getVoitures);

router
.route('/:id')
.get(getVoitureById)
router.route('/:id/reviews').post(protect, createVoitureReview)

export default router