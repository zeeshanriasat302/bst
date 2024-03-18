const express = require('express');
const adminrouter = express.Router();
const adminController = require('../controllers/admincontroller');

adminrouter.post('/createadmin', adminController.createAdmin);
adminrouter.post('/adminlogin', adminController.adminLogin);

module.exports = adminrouter;