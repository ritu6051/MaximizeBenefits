// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const InsuranceSchema = new mongoose.Schema({
    insuranceName: { // Cigna
        type: String,
        required: true,
    },
    insuranceType: { // Health
        type: String,
        required: true,
    },
    plans: { //Tiers
        type: Array,
        required: true,

        planName: { // Gold
            type: String,
            required: true,
        },
        yearlyCost: { // 100/year
            type: String,
            required: true,
        },
        age: { // <65
            type: String,
            required: false,
        },
        coverages: { // [Physical: $100, Dental: $50]
            type: Array,
            required: true,
        }
    }
});

const Insurance = mongoose.model("Insurance", InsuranceSchema);
// module.exports = Insurance;
export default Insurance;