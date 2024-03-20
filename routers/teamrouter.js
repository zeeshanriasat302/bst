const express = require('express');
const teamMemberRouter = express.Router();
const teamMemberController = require('../controllers/teamcontroller');

// Add a new route to add a team member
teamMemberRouter.post('/teammember', teamMemberController.addTeamMember);
teamMemberRouter.put('/updateteam/:teamMemberId', teamMemberController.updateTeamMember);
teamMemberRouter.get('/allteammembers', teamMemberController.getAllTeamMembers);
module.exports = teamMemberRouter;
