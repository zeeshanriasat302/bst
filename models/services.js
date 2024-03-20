const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State"

    },
    name: { type: String, required: true, unique: true, trim: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },

});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
