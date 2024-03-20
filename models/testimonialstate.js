const mongoose = require('mongoose');

const testimonialStateSchema = new mongoose.Schema({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "state",
        required: true
    },
    Testimonial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "testimonial",
        required: true
    },
    name: {
        type: String,
        required: true
    },

});

const TestimonialState = mongoose.model('testimonialstate', testimonialStateSchema);

module.exports = TestimonialState;
