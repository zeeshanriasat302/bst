const express = require('express');

const servicesRouter = express.Router();
const servicesController = require('../controllers/servicescontroller');

servicesRouter.post('/addservices', servicesController.addService);
servicesRouter.put('/updateservice/:serviceId', servicesController.updateService);
servicesRouter.get('/allservices', servicesController.getAllServices);

module.exports = servicesRouter;

