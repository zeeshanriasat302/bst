
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({

    feedback: { type: String, required: true },
    name: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },

});

const Testimonial = mongoose.model('testimonial', testimonialSchema);

module.exports = Testimonial;
