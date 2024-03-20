const Joi = require('joi');

function validateInsuranceCreation(insurance) {
    const insuranceSchema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        createdBy: Joi.string().optional(),
        updatedBy: Joi.string().optional(),
    });

    const { error, value } = insuranceSchema.validate(insurance);
    return { error, value };
}

module.exports = {
    validateInsuranceCreation
};
