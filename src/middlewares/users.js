const Joi = require("joi");

function validateUsersProposal(users) {
  const usersSchema = Joi.object({
    username: Joi.string().required(),
    email : Joi.string().required() ,
    password : Joi.string().required()

  });
  return usersSchema.validate(users);
}
module.exports = { validateUsersProposal };


