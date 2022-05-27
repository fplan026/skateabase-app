const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let skateSchema = new Schema({
    size: {
        type: Number
    },
    isRented: {
        type: Boolean,
        default: false
    },
    // renter: { type: Schema.Types.ObjectId, ref: 'Renter' },
}, {
    collection: 'skates'
})
module.exports = mongoose.model('Skate', skateSchema)