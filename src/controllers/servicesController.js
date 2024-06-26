const database = require("../configurations/databaseConfig");
const { validateServiceProposal} = require("../middlewares/service")

exports.createServices = async (req, res) => {
    try {
        console.log("services")
        const { error, value } = validateServiceProposal(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const insertQuery = "INSERT INTO services SET ?";
        const params = [value];
        database.handleDatabaseQuery(insertQuery, params, res, (results, res) => {
            const newStateId = results.insertId;
            const selectQuery = "SELECT * FROM services WHERE serivce_id = ?";
            const selectParams = [newStateId];
            database.handleDatabaseQuery(selectQuery, selectParams, res, (stateData, res) => {
                res.status(201).json({ message: "services created successfully", data: stateData[0] });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
