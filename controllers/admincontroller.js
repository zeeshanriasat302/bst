const adminModel = require('../models/admin.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateAdminCreation, validateAdminlogin } = require('../validaters/adminvalidater.js');

const adminController = {
    createAdmin: async (req, res, next) => {
        try {
            const { error, value } = validateAdminCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { firstname, lastname, email, password } = value;

            const existingAdmin = await adminModel.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ error: 'Admin with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new adminModel({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });

            await newAdmin.save();

            newAdmin.password = undefined
            return res.status(201).json({ message: 'Admin created successfully', newAdmin });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    adminLogin: async (req, res, next) => {
        try {
            const jwtsecrat=process.env.JWT_SECRATE_KEY;
            const { error, value } = validateAdminlogin(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { email, password } = value;

            const admin = await adminModel.findOne({ email });

            if (!admin) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }


            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }


            const token = jwt.sign({ userId: admin._id, email: admin.email },jwtsecrat, {
                expiresIn: '1h',
            });
            

            admin.password = undefined
            return res.status(200).json({ message: 'Admin login successful', admin, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = adminController;