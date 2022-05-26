const express = require('express');
const rentalRoute = express.Router();
// model
let RentalModel = require('../models/Rental');
rentalRoute.route('/create-rental').post((req, res, next) => {
  RentalModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});
rentalRoute.route('/').get((req, res, next) => {
    RentalModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })
rentalRoute.route('/edit-rental/:id').get((req, res, next) => {
   RentalModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Update
rentalRoute.route('/update-rental/:id').put((req, res, next) => {
  RentalModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('rental successfully updated!')
    }
  })
})
// Delete
rentalRoute.route('/delete-rental/:id').delete((req, res, next) => {
  RentalModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = rentalRoute;