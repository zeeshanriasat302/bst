const Joi = require('joi');

function validateTeamCreation(TeamMember) {
    const teamSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    });
    const { error, value } = teamSchema.validate(TeamMember);
    return { error, value };
}

module.exports = {
    validateTeamCreation
};