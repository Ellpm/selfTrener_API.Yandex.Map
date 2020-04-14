const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Event = require('../models/event');
const { cookiesCleaner } = require('../middleware/auth');
const { sessionChecker } = require("../middleware/auth");
const saltRounds = 10;

router.post('/coordinates', async function (req, res, next) {
  const events = await Event.find();
  res.json({ events: events })
})
router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/events");
  } else {
    res.redirect("/login");
  }
});

router.post("/registr", async function (req, res, next) {
  const { login, email, password } = req.body;
  let passwordHash = await bcrypt.hash(password, saltRounds);
  await User.createUser(login, email, passwordHash);
  res.redirect("/login");
});

router.get("/register", function (req, res, next) {
  res.render("registr");
});

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/ok", async function (req, res, next) {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect("/events");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
