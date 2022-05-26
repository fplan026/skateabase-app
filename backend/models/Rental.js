const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rentalSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
}, {
  collection: 'rentals'
})
module.exports = mongoose.model('Rental', rentalSchema)