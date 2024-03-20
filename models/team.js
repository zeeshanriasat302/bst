const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        type: String,
        required: true,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },

});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
