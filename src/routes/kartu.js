const express = require("express");
const router = express.Router();
const { kartu } = require("../models");
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  const findKartu = await kartu.findByPk(1);
  console.log(findKartu);
  //   res.render("perpanjang", { title: "perpanjang", users });
});

module.exports = router;
