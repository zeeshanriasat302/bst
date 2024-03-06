const database = require("../configurations/databaseConfig");
const { validateStateProposal ,validateUpdateStateProposal} = require("../middlewares/states")

exports.createState = async (req, res) => {
    try {
        const { error, value } = validateStateProposal(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const insertQuery = "INSERT INTO states SET ?";
        const params = [value];
        database.handleDatabaseQuery(insertQuery, params, res, (results, res) => {
            const newStateId = results.insertId;
            const selectQuery = "SELECT * FROM states WHERE state_id = ?";
            const selectParams = [newStateId];
            database.handleDatabaseQuery(selectQuery, selectParams, res, (stateData, res) => {
                res.status(201).json({ message: "State created successfully", data: stateData[0] });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.allState = async (req, res) => {
    const statesQuery = "SELECT * FROM states";
    try {
      const stateResults = await new Promise((resolve, reject) => {
        database.handleDatabaseQuery(statesQuery,[], res, resolve, reject);
      });
  
      if (stateResults.length === 0) {
        return res.status(404).json({ message: "states not found" });
      }
      res.status(200).json({ message: "states fetched successfully", stateResults });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while processing your request.", error: err.message });
    }
};



exports.getState = async (req, res) => {
    const { state_id } = req.params;
    const stateQuery = "SELECT * FROM states WHERE state_id = ?";
    const params = [state_id]
    try {
        const stateResults = await new Promise((resolve, reject) => {
            database.handleDatabaseQuery(stateQuery, params, res, resolve, reject);
        });
         if (!stateResults || stateResults.length === 0) {
            return res.status(404).json({ message: "state not found" });
        }
        let state= stateResults[0]
        res.status(200).json({ message: "states fetched successfully", state});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while processing your request.", error: err.message });
    }
};


exports.deleteState = async (req, res) => {
    const { state_id } = req.params;
    const stateQuery = "DELETE FROM states WHERE state_id = ?";
    const params = [state_id]
    try {
        const stateResults = await new Promise((resolve, reject) => {
            database.handleDatabaseQuery(stateQuery, params, res, resolve, reject);
        });
        if (!stateResults || stateResults.affectedRows === 0) {
            return res.status(404).json({ message: "state not found" });
          }
        let state= stateResults[0]
        res.status(200).json({ message: "state deleted successfully", state});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while processing your request.", error: err.message });
    }
};


exports.updateState = async (req, res) => {
    try {
        const { state_id } = req.params;
        const { error, value } = validateUpdateStateProposal(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
        const updateQuery = "UPDATE states SET ? WHERE state_id = ?";
        const updateParams = [value, state_id];
        database.handleDatabaseQuery(updateQuery, updateParams, res, (results, res) => {
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "states not found" });
          }
          const selectQuery = "SELECT * FROM states WHERE state_id = ?";
          const selectParams = [state_id];
    
          database.handleDatabaseQuery(selectQuery, selectParams, res, (stateData, res) => {
            res.status(201).json({ message: "Updated successfully", data: stateData[0] });
          });
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};