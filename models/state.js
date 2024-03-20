const mongoose = require('mongoose');


const stateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    logo_url: {
        type: String,
        required: true,
    },
    initial_pricing: {
        type: String,
        required: true,
    },
    regular_pricing: {
        type: String,
        required: true,
    },
    brief_pricing: {
        type: String,
        required: true,
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

const State = mongoose.model('State', stateSchema);

module.exports = State;
