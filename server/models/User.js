// const mongoose = require('mongoose');
import mongoose from 'mongoose'

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
            required: false,
        },
        insuranceType: { // Cigna
            type: String,
            required: false,
        },
        planName: { // Gold
            type: String,
            required: false,
        },
        yearlyCost: { // 100/year
            type: String,
            required: false,
        },
        coverages: {
            type: Array,
            required: false,
        }
    }
    // }
});

const User = mongoose.model("User", UserSchema);
// module.exports = User;
export default User;