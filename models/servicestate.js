const mongoose = require('mongoose');

const serviceStateSchema = new mongoose.Schema({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },

})
const ServiceState = mongoose.model('servicestate', serviceStateSchema);

module.exports = ServiceState;