
const express = require('express');
const insuranceCompanyController = require('../controllers/insurancecontroller');

const insuranceCompanyRouter = express.Router();


insuranceCompanyRouter.post('/insurancecompany', insuranceCompanyController.addInsuranceCompany);
insuranceCompanyRouter.put('/insurancecompany/:insuranceId', insuranceCompanyController.updateInsuranceCompany);
insuranceCompanyRouter.get('/allinsurancecompanies', insuranceCompanyController.getAllInsuranceCompanies);

// Export the router
module.exports = insuranceCompanyRouter;
