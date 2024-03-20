const Joi = require('joi');

function validateServicesCreation(services) {
    const servicesSchema = Joi.object({
        name: Joi.string().required(),
        createdBy: Joi.string().optional(),
        updatedBy: Joi.string().optional(),
    });
    const { error, value } = servicesSchema.validate(services);
    return { error, value };
}

module.exports = {
    validateServicesCreation
};
