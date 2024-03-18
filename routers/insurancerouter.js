
const express = require('express');
const insuranceCompanyController = require('../controllers/insurancecontroller');
const checkAuth = require("../middleware/auth")

const insuranceCompanyRouter = express.Router();


insuranceCompanyRouter.post('/insurancecompany', checkAuth(), insuranceCompanyController.addInsuranceCompany);
insuranceCompanyRouter.put('/insurancecompany/:insuranceId', checkAuth(), insuranceCompanyController.updateInsuranceCompany);
insuranceCompanyRouter.get('/allinsurancecompanies', checkAuth(), insuranceCompanyController.getAllInsuranceCompanies);

// Export the router
module.exports = insuranceCompanyRouter;
