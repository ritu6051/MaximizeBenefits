// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const InsuranceSchema = new mongoose.Schema({
    insuranceName: {
        type: String,
        required: true,
    },
    insuranceType: {
        type: String,
        required: true,
    },
    plans: {
        type: Array,
        required: true,
        
        planName: {
            type: String,
            required: true,
        },
        yearlyCost: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: false,
        },
        coverages: {
            type: Array,
            required: true,
        }
    }
});

const Insurance = mongoose.model("Insurance", InsuranceSchema);
// module.exports = Insurance;
export default Insurance;