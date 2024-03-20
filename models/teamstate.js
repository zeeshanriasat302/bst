const mongoose = require('mongoose');

const teamMemberStateSchema = new mongoose.Schema({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    },
    teamMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true
    },
    teamMemberName: {
        type: String,
        required: true
    },

});

const TeamMemberState = mongoose.model('TeamMemberState', teamMemberStateSchema);

module.exports = TeamMemberState;