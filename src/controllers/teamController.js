const database = require("../configurations/databaseConfig");
const { validateTeamProposal } = require("../middlewares/teams")

exports.createTeam = async (req, res) => {
    try {
        const { error, value } = validateTeamProposal(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const insertQuery = "INSERT INTO teams SET ?";
        const params = [value];
        database.handleDatabaseQuery(insertQuery, params, res, (results, res) => {
            const newStateId = results.insertId;
            const selectQuery = "SELECT * FROM teams WHERE team_id = ?";
            const selectParams = [newStateId];
            database.handleDatabaseQuery(selectQuery, selectParams, res, (stateData, res) => {
                res.status(201).json({ message: "teams created successfully", data: stateData[0] });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
