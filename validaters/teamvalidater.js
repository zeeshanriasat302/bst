const Joi = require('joi');

function validateTeamCreation(TeamMember) {
    const teamSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        createdBy: Joi.string().optional(),
        updatedBy: Joi.string().optional(),
    });
    const { error, value } = teamSchema.validate(TeamMember);
    return { error, value };
}

module.exports = {
    validateTeamCreation
};