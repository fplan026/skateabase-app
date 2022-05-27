const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let renterSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    skates: [{ type: Schema.Types.ObjectId, ref: 'Skate'}]
}, {
    collection: 'renters'
})
module.exports = mongoose.model('Renter', renterSchema)