const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [ true, 'Company name should be declared.'],
        unique: [ true, 'This company name already registered.']
    },
    restaurantType: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const company = mongoose.model('company', companySchema);
module.exports = company;