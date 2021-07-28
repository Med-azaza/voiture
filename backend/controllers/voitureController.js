import asyncHandler from 'express-async-handler'
import Voiture from '../models/voitureModel.js'

// @desc    Fetch all voitures
// @route   GET /api/voitures
// @access  Public
const getVoitures = asyncHandler(async (req, res) => {

  const voitures = await Voiture.find();

  res.status(200).json({
      success: true,
      voitures
  })

})
 
const getVoitureById = asyncHandler(async (req, res) => {
    const voiture = await Voiture.findById(req.params.id)

    if (voiture) {
        res.json(voiture)
      } else {
        res.status(404)
        throw new Error('voiture not found')
      }
    })




// @desc    Create new review
// @route   POST /api/voitures/:id/reviews
// @access  Private
const createVoitureReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const voiture = await Voiture.findById(req.params.id)

  if (voiture) {
    const alreadyReviewed = voiture.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    voiture.reviews.push(review)

    voiture.numReviews = voiture.reviews.length

    voiture.rating =
      voiture.reviews.reduce((acc, item) => item.rating + acc, 0) /
      voiture.reviews.length

    await voiture.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('voiture not found')
  }
})

export {getVoitures, getVoitureById, createVoitureReview}













