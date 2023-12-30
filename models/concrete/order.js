const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, "User ıd required." ],
        ref: "user"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true,  "Restaurant ıd required." ],
        ref: "restaurant"
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, "Comment Id required."],
        ref: "comment"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const order = mongoose.model('order', orderSchema);
module.exports = order;