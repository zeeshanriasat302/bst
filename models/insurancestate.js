const mongoose = require('mongoose');

const insuranceStateSchema = new mongoose.Schema({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    },
    insuranceCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InsuranceCompany",
        required: true
    },
    insuranceCompanyName: {
        type: String,
        required: true
    },
});

const InsuranceState = mongoose.model('InsuranceState', insuranceStateSchema);

module.exports = InsuranceState;