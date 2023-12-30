const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    },
    menuItems: [{
        content: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: ''
        },
        image: {
            type:String,
            default: ''
        }
    }]
},{timestamps: true});

const menu = mongoose.model('menu', menuSchema);
module.exports = menu;