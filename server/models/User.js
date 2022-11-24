const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    },
    enrolledIn: {
        type: Array,
        required: false,

        insuranceName: { // Cigna
            type: String,
            required: true,
        },
        plans: { 
            planName: { // Gold
                type: String,
                required: true,
            },
            yearlyCost: { // 100/year
                type: String,
                required: true,
            },
        }
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;