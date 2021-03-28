var express = require("express");
var router = express.Router();
const { user, kartu } = require("../models");

router.get("/", async (req, res, next) => {
  const users = await user.findAll();
  const member = users.filter((e) => e.member == true).length;
  const totalUsers = users.length;
  const expired = users.filter(
    (e) => new Date(e.expired).getTime() <= new Date().getTime()
  ).length;
  const nonMember = totalUsers - member;
  res.render("dashboard", {
    title: "dashboard",
    totalUsers,
    member,
    nonMember,
    expired,
  });
});

module.exports = router;
