const mongoose = require('mongoose');
const State = require('./state');

const insuranceCompanySchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    image: {
        type: String,
        required: false,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },

});

const InsuranceCompany = mongoose.model('InsuranceCompany', insuranceCompanySchema);

module.exports = InsuranceCompany;
