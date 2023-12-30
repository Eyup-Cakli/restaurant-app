const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [ true, 'Please enter a city name.' ]
    },
    county: {
        type: String,
        required: [ true, 'Please enter a county name.' ]
    },
    plainAddress: {
        type: String,
        maxlength: 500,
        required: [ true, 'Please fill in the plain address field.' ]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const address = mongoose.model('address', addressSchema);
module.exports = address;