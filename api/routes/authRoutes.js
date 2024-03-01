const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, welcome to talent trade");
});

module.exports = router;
