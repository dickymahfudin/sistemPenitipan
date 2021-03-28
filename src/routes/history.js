var express = require("express");
var router = express.Router();
const { user, kartu, history } = require("../models");

router.get("/", async (req, res, next) => {
  const historys = history.findAll();
  res.json({
    data: historys,
  });
});

router.post("/", async (req, res, next) => {
  const { user_id } = req.body;

  const historys = history.findAll();
  res.json({
    data: historys,
  });
});
module.exports = router;
