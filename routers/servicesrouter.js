const express = require('express');
const servicesRouter = express.Router();
const servicesController = require('../controllers/servicescontroller');
const checkAuth = require("../middleware/auth")

servicesRouter.post('/addservices',checkAuth(), servicesController.addService);
servicesRouter.put('/updateservice/:serviceId',checkAuth(), servicesController.updateService);
servicesRouter.get('/allservices',checkAuth(), servicesController.getAllServices);

module.exports = servicesRouter;

