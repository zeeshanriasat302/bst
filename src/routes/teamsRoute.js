const express = require("express");
const router = express.Router();

const teams = require("../controllers/teamController");

router.post("/create",teams.createTeam);


module.exports = router;