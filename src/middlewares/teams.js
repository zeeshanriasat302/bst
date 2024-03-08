const Joi = require("joi");

function validateTeamProposal(teams) {
  const teamSchema = Joi.object({
    username: Joi.string().required(),
    description : Joi.string().required() ,
    team_creator_user_id : Joi.number().required() ,
    team_creator_state_id : Joi.number().required() 
   
  });
  return teamSchema.validate(teams);
}


module.exports = { validateTeamProposal };


