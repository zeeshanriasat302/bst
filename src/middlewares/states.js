const Joi = require("joi");

function validateStateProposal(states) {
  const stateSchema = Joi.object({
    state_name: Joi.string().required(),
  });
  return stateSchema.validate(states);
}


function validateUpdateStateProposal(states) {
    const stateSchema = Joi.object({
      state_name: Joi.string().required(),
    });
    return stateSchema.validate(states);
  }
  

module.exports = { validateStateProposal ,validateUpdateStateProposal};
