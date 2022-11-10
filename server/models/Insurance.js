const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
    insuranceName: { // Cigna
        type: String,
        required: true,
    },
    insuranceType: { // Health
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
        age: { // <65
            type: String,
            required: true,
        },
        coverages: { // [Physical: $100, Dental: $50]
            type: Array,
            required: true,
        }
    }

    // cost: {
    //     type: Number,
    //     required: true,
    // },
    // age: {
    //     type: String,
    //     required: true,
    // },
    // offerings: {
    //     type: Object,
    //     required: true,
    // },
});

const Insurance = mongoose.model("InsuranceNew", InsuranceSchema);
module.exports = Insurance;