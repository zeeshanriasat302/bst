const bcrypt = require('bcrypt');
const saltRounds = 10;

const database = require('../configurations/databaseConfig');
const { validateUsersProposal } = require('../middlewares/users');

exports.createUser = async (req, res) => {
    try {
        const { error, value } = validateUsersProposal(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(value.password, saltRounds);
        value.password = hashedPassword;

        const insertQuery = 'INSERT INTO users SET ?';
        const params = [value];

        database.handleDatabaseQuery(insertQuery, params, res, (results, res) => {
            const newUserId = results.insertId;
            const selectQuery = 'SELECT * FROM users WHERE user_id = ?';
            const selectParams = [newUserId];

            database.handleDatabaseQuery(selectQuery, selectParams, res, (userData, res) => {
                res.status(201).json({ message: 'User created successfully', data: userData[0] });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
