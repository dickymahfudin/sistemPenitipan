const express = require("express");
const router = express.Router();
const { user } = require("../models");
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  const users = await user.findAll();
  res.render("perpanjang", { title: "perpanjang", users });
});

router.put("/", async (req, res, next) => {
  const { id, quantity } = req.body;
  console.log({ id, quantity });
  const findUser = await user.findByPk(id);
  const date = new Date(findUser.expired);
  const newDate =
    quantity == 1
      ? date.setDate(date.getDate() + 1)
      : quantity == 2
      ? date.setMonth(date.getMonth() + 1)
      : quantity == 3
      ? date.setMonth(date.getMonth() + 2)
      : date.setMonth(date.getMonth() + 3);

  const update = await findUser.update({ expired: new Date(newDate) });
  res.status(200).json({
    status: "success",
    data: update,
  });
});

module.exports = router;
