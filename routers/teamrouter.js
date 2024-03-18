const express = require('express');
const teamMemberRouter = express.Router();
const teamMemberController = require('../controllers/teamcontroller');
const checkAuth = require("../middleware/auth");

teamMemberRouter.post('/teammember', checkAuth(), teamMemberController.addTeamMember);
teamMemberRouter.put('/updateteam/:teamMemberId', checkAuth(), teamMemberController.updateTeamMember);
teamMemberRouter.get('/allteammembers', checkAuth(), teamMemberController.getAllTeamMembers);

module.exports = teamMemberRouter;
