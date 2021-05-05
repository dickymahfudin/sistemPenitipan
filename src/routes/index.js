var express = require("express");
var router = express.Router();
const { user, kartu, history } = require("../models");

router.get("/", async (req, res, next) => {
  const users = await user.findAll();
  const member = users.filter((e) => e.member == true).length;
  const totalUsers = users.length;
  const expired = users.filter(
    (e) => new Date(e.expired).getTime() <= new Date().getTime()
  ).length;
  const nonMember = totalUsers - member;
  const tempHistorys = await history.findAll({
    include: [{ model: user, as: "user" }],
  });

  const historys = tempHistorys.map((history) => {
    const update =
      new Date(history.createdAt).getTime() >=
      new Date(history.updatedAt).getTime();

    return {
      name: history.user.name,
      expired: history.user.expired,
      loker: history.loker,
      status: !history.status ? "Process" : "Done",
      tanggal_masuk: history.createdAt,
      tanggal_keluar: update ? "-" : history.updatedAt,
    };
  });
  res.render("dashboard", {
    title: "dashboard",
    totalUsers,
    member,
    nonMember,
    expired,
    historys,
  });
});

module.exports = router;
