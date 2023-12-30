const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'    
    },
    about: {
        type: String,
        maxlength: 500,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurant