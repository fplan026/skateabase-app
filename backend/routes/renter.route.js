const express = require('express');
const renterRoute = express.Router();
// model
let RenterModel = require('../models/Renter');
renterRoute.route('/create-renter').post((req, res, next) => {
  RenterModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});
renterRoute.route('/').get((req, res, next) => {
    RenterModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })
renterRoute.route('/edit-renter/:id').get((req, res, next) => {
   RenterModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Update
renterRoute.route('/update-renter/:id').put((req, res, next) => {
  RenterModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('renter successfully updated!')
    }
  })
})
// Delete
renterRoute.route('/delete-renter/:id').delete((req, res, next) => {
  RenterModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = renterRoute;