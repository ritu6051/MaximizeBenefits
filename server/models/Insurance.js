const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
    insuranceType: {
        type: String,
        required: true,
    },
    insuranceName: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    offerings: {
        type: Object,
        required: true,
    },
});

const Insurance = mongoose.model("Insurance", InsuranceSchema);
module.exports = Insurance;