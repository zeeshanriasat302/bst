const Joi = require('joi');

function validateServicesCreation(services) {
    const servicesSchema = Joi.object({
        name: Joi.string().required()
    });
    const { error, value } = servicesSchema.validate(services);
    return { error, value };
}

module.exports = {
    validateServicesCreation
};
