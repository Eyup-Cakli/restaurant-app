const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        maxlenght: 500
    },
    point: {
        type: Number
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;