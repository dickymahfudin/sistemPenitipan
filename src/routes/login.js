const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("login", { layout: "layouts/blank" });
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "admin123") {
    req.session.login = true;
    res.redirect("/");
  } else {
    // req.flash("error", "fea");
    res.redirect("/login");
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/login");
});

module.exports = router;
