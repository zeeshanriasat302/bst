const TeamMember = require('../models/team');
const mongoose = require('mongoose');
const { validateTeamCreation } = require('../validaters/teamvalidater');
const teamMemberController = {

    addTeamMember: async (req, res) => {
        try {
            const { error, value } = validateTeamCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            const { name, description, image } = value;
            const createdBy = req.user._id;
            const newTeamMember = new TeamMember({ name, description, image, createdBy });
            await newTeamMember.save();
            return res.status(201).json({ message: 'Team member added successfully', teamMember: newTeamMember });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateTeamMember: async (req, res) => {
        try {
            const { teamMemberId } = req.params;
            const { error, value } = validateTeamCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            if (!mongoose.Types.ObjectId.isValid(teamMemberId)) {
                return res.status(400).json({ error: 'Invalid userId format' });
            }
            const { name, description, image } = value;
            const existingTeamMember = await TeamMember.findById(teamMemberId);
            if (!existingTeamMember) {
                return res.status(404).json({ error: 'Team member not found' });
            }
            const isTeamMemberExist = await TeamMember.findOne({
                name: value.name,
                _id: { $ne: teamMemberId }
            });
            if (isTeamMemberExist) {
                return res.status(400).json({ error: 'TeamMember already exists with the same name' });
            }
            existingTeamMember.name = name;
            existingTeamMember.description = description;
            existingTeamMember.image = image;
            existingTeamMember.updatedBy = req.user._id;
            await existingTeamMember.save();
            return res.status(200).json({ message: 'TeamMember details updated successfully', teamMember: existingTeamMember });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllTeamMembers: async (req, res) => {
        try {
            const allTeamMembers = await TeamMember.find();
            return res.status(200).json({ message: "TeamMember fetched succesfully", teamMembers: allTeamMembers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = teamMemberController;
