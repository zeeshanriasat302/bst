const Joi = require('joi');

function validateAdminCreation(adminModel) {
    const adminSchema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = adminSchema.validate(adminModel);
    return { error, value };
}
function validateAdminlogin(adminModel) {
    const adminSchema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = adminSchema.validate(adminModel);
    return { error, value };
}

module.exports = {
    validateAdminCreation,
    validateAdminlogin
};
