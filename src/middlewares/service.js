const Joi = require("joi");

function validateServiceProposal(services) {
  const servicesSchema = Joi.object({
    serivceName: Joi.string().required(),
    description: Joi.string().required(),
    creator_user_id: Joi.number().required(),
    state_id: Joi.number().required(),
  });
  return servicesSchema.validate(services);
}


module.exports = { validateServiceProposal };


