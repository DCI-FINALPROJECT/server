const express = require("express");
const { addNewCapacity, getAllCapacities } = require("../controller/capacity.controller");
const router = express.Router();


// CREATE NEW CAPACITY

router.post("/capacity/addNewCapacity",addNewCapacity);

// GET ALL CAPACITIES

router.get("/capacity/getAllCapacities", getAllCapacities);


module.exports = router;