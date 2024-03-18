const Joi = require('joi');

function validateInsuranceCreation(insurance) {
    const insuranceSchema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required()
    });

    const { error, value } = insuranceSchema.validate(insurance);
    return { error, value };
}

module.exports = {
    validateInsuranceCreation
};
