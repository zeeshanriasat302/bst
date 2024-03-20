const Joi = require('joi');

function validateStateCreation(state) {
    const stateSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        logo_url: Joi.string().required(),
        regular_pricing: Joi.string().required(),
        brief_pricing: Joi.string().required(),
        initial_pricing: Joi.string().required(),
        createdBy: Joi.string().optional(),
        updatedBy: Joi.string().optional(),
        team: Joi.array().required(),
        services: Joi.array().required(),
        insurance:Joi.array().required(),
        testimonials:Joi.array().required(),
    });
    const { error, value } = stateSchema.validate(state);
    return { error, value };
}

module.exports = {
    validateStateCreation
};
