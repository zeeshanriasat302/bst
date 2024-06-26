const express = require('express');
const stateRouter = express.Router();
const StateController = require('../controllers/statecontroller');
const checkAuth = require("../middleware/auth");

stateRouter.post('/addstate', checkAuth(), StateController.addState);
stateRouter.put('/update/:stateId', checkAuth(), StateController.updateStateDetails);
stateRouter.get('/allstates', StateController.getAllStates);
stateRouter.get('/alldata/:stateId', StateController.getAllDataByStateId);


module.exports = stateRouter;
