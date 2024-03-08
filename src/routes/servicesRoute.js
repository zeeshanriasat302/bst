const express = require("express");
const router = express.Router();

const services = require("../controllers/servicesController");

router.post("/create",services.createServices);


module.exports = router;