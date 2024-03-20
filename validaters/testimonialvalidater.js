const Joi = require('joi');

function validateTestimonialCreation(Testimonial) {
    const testimonialSchema = Joi.object({
        name: Joi.string().required(),
        feedback: Joi.string().required(),
        createdBy: Joi.string().optional(),
        updatedBy: Joi.string().optional(),
    });
    const { error, value } = testimonialSchema.validate(Testimonial);
    return { error, value };
}

module.exports = {
    validateTestimonialCreation
};
