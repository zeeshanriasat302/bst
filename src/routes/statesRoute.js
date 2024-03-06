const express = require("express");
const router = express.Router();

const states = require("../controllers/statesController");

router.post("/create",states.createState);
router.get("/all",states.allState);
router.get("/:state_id",states.getState);
router.put("/update/:state_id",states.updateState);
router.delete("/delete/:state_id",states.deleteState);

module.exports = router;