const express = require("express");
const router = express.Router();
const { user, kartu } = require("../models");
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  const users = await user.findAll({
    attributes: [
      "id",
      "name",
      "address",
      "phone",
      "uid",
      [
        Sequelize.literal(
          `(CASE member WHEN '1' THEN "Member" ELSE "Non Member" END)`
        ),
        "member",
      ],
      [
        Sequelize.fn("date_format", Sequelize.col("expired"), "%d-%m-%Y"),
        "expired",
      ],
    ],
  });
  // return res.status(200).json({
  //   users,
  // });
  res.render("user/index", { title: "user", users });
});

router.get("/form", async (req, res, next) => {
  const { id } = req.query;
  const min = new Date().toJSON().split("T")[0];

  const tempKartu = await kartu.findByPk(1);
  let value = {
    name: "",
    address: "",
    phone: "",
    uid: !tempKartu.status ? tempKartu.name : "",
    expired: "",
    min,
    edit: false,
    method: "POST",
    action: "/user",
  };

  if (id !== "add" && id !== " ") {
    const findUser = await user.findByPk(id);
    value = findUser;
    value.edit = true;
    value.method = "PUT";
    value.action = `/user/${findUser.id}`;
  }
  res.render("user/form", { layout: "layouts/blank", value });
});

router.post("/", async (req, res, next) => {
  const { name, address, phone, uid, expired, member } = req.body;
  const create = await user.create({
    name,
    address,
    phone,
    uid,
    expired,
    member,
  });

  const tempKartu = await kartu.findByPk(1);

  await tempKartu.update({ status: true });
  return res.status(201).json({
    status: "success",
    data: create,
  });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, address, phone, uid, expired, member } = req.body;
  const findUser = await user.findByPk(id);

  const update = await findUser.update({
    name,
    address,
    phone,
    uid,
    expired,
    member,
  });
  return res.status(202).json({
    status: "success",
    data: update,
  });
});

module.exports = router;
