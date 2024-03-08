const Joi = require("joi");

function validateStateProposal(states) {
  const stateSchema = Joi.object({
    state_name: Joi.string().required(),
    title : Joi.string().required() ,
    description : Joi.string().required() ,
    email : Joi.string().required() ,
    phone_no : Joi.string().required() ,
    user_id : Joi.number().required() 

  });
  return stateSchema.validate(states);
}



function validateUpdateStateProposal(states) {
    const stateSchema = Joi.object({
      state_name: Joi.string(),
      title : Joi.string(),
      description : Joi.string(),
      email : Joi.string(),
      phone_no : Joi.string()
    });
    return stateSchema.validate(states);
  }
  

module.exports = { validateStateProposal ,validateUpdateStateProposal};


