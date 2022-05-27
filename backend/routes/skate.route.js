const express = require('express');
const app = express();
// Express route
const skateExpressRoute = express.Router();
// User schema
let SkateSchema = require('../models/Skate');

//get skates
skateExpressRoute.route('/skates').get((req, res) => {
    SkateSchema.find((error, data) => {
        if (error) {
            console.log(error.message)
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//create single skate
skateExpressRoute.route('/create-skate').post((req, res, next) => {
    SkateSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//edit single skate
skateExpressRoute.route('/edit-skate/:id').get((req, res, next) => {
    SkateSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//update skate
skateExpressRoute.route('/update-skate/:id').put((req, res, next) => {
    SkateSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('skate successfully updated!')
        }
    })
})

//delete skate
skateExpressRoute.route('/delete-skate/:id').delete((req, res, next) => {
    SkateSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = skateExpressRoute;