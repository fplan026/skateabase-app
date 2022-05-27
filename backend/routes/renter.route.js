const express = require('express');
const renterRoute = express.Router();
// model
let RenterModel = require('../models/Renter');

/**
  * @swagger
  * "/create-renter":
  *   post:
  *     tags: [Renter]
  *     summary: ""
  *     consumes: [application/json]
  *     produces: [application/json]
  *     parameters:
  *       - name: "name" 
  *         description: "The full name of the renter"
  *         in: body
  *         required: true
  *         type: string 
  *         example: "Jane Smith"
  *       - name: "email"
  *         description: "The email of the renter"
  *         in: body
  *         required: true
  *         type: string
  *         example: renter@renter.com
  *       - name: "phone"
  *         description: "The phone number of the renter"
  *         in: body
  *         required: true
  *         type: string
  *         example: (555) 555-5555
  *     responses:
  *       200:
  *         description: "OK"
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               description: ""
  *               type: boolean
  *               example: true
  *       400:
  *         description: ""
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               description: ""
  *               type: boolean
  *               example: false
  *       500:
  *         description: ""
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               description: ""
  *               type: boolean
  *               example: false
  */
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