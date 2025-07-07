const express = require("express");
const path = require("path");
const router = express.Router();

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/employee", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "model", "employee.json"));
});

module.exports = router;
