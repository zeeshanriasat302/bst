const mongoose = require('mongoose');

const Testimonial = require('../models/testimonials');
const { validateTestimonialCreation } = require('../validaters/testimonialvalidater');

const testimonialController = {
    addTestimonial: async (req, res) => {
        try {
            const { error, value } = validateTestimonialCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            const { name, feedback, createdBy } = value;
            const newTestimonial = new Testimonial({ name, feedback, createdBy });
            await newTestimonial.save();
            return res.status(201).json({ message: 'Testimonial added successfully', testimonial: newTestimonial });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateTestimonial: async (req, res) => {
        try {
            const { testimonialId } = req.params;
            const { error, value } = validateTestimonialCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            if (!mongoose.Types.ObjectId.isValid(testimonialId)) {
                return res.status(400).json({ error: 'Invalid userId format' });
            }
            const existingTestimonial = await Testimonial.findOne({ _id: testimonialId });
            if (!existingTestimonial) {
                return res.status(404).json({ error: 'Testimonial not found' });
            }
            const isTestimonialExist = await Testimonial.findOne({
                name: value.name,
                _id: { $ne: testimonialId }
            });
            if (isTestimonialExist) {
                return res.status(400).json({ error: 'State already exists with the same name' });
            }
            existingTestimonial.name = value.name;
            existingTestimonial.feedback = value.feedback;
            existingTestimonial.updatedBy = value.updatedBy;
            await existingTestimonial.save();

            return res.status(200).json({ message: 'Testimonial details updated successfully', testimonial: existingTestimonial });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllTestimonials: async (req, res) => {
        try {
            const testimonials = await Testimonial.find();
            return res.status(200).json({ message: "Testimonials fetched succesfully", testimonials: testimonials });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

};

module.exports = testimonialController;
