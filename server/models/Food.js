const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // foodName: {
    //     type: String,
    //     required: true,
    // },
    // foodAge: {
    //     type: Number,
    //     required: true,
    // },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

// const Food = mongoose.model("foodData", FoodSchema);
const User = mongoose.model("users", UserSchema);
module.exports = User;