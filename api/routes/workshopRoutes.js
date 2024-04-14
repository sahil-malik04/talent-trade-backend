const express = require("express");
const router = express.Router();
const { getWorshops, addWorshop } = require("../controllers/workshopController");

router.get("/get-workshops", getWorshops);
router.post("/add-workshop", addWorshop);

module.exports = router;
