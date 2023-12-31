const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 50,
        required: [ true, "Please enter a username" ],
        unique: [ true, "Please enter a valid username" ]
    },
    email: {
        type: String,
        required: [ true, "please enter an email." ],
        unique: [ true, "The email address you entered is used by another user. Please use a different email address." ],
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "please enter a valid email.",
        },
    },
    password: {
        type: String,
        required: [ true, 'Please enter a password' ],
        minlength: [ 6, 'Minumum password length  is 6 characters' ]
    },
    birthDate: {
        type: Date,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    gender: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect email or password.');
    }
    throw Error('incorrect password or email.');
}

const user = mongoose.model('user', userSchema);
module.exports = user;