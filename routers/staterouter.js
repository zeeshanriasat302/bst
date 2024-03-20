const express = require('express');
const stateRouter = express.Router();
const StateController = require('../controllers/statecontroller');


stateRouter.post('/addstate', StateController.addState);
stateRouter.put('/update/:stateId', StateController.updateStateDetails);
stateRouter.get('/allstates', StateController.getAllStates);


module.exports = stateRouter;