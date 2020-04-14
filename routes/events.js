const express = require("express");
const router = express.Router();
const Event = require("../models/event");
//const sport = require('../seed')
console.log("started events");

router.use(function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/", async function (req, res, next) {
  let events = await Event.mostRecent();
  console.log(events);

  res.render("events/index", { events });
});

router.post("/", async function (req, res, next) {
  const newEvent = new Event({
    title: req.body.title,
    // type: sport[0][req.body.type],
    // icon: sport[1][req.body.type],
    time: req.body.time,
    body: req.body.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    coordinates: req.session.user.coordinates,
    author: req.session.user.name,
    authorId: req.session.user._id,


  });
  newEvent.save();

  res.redirect(`/events/${newEvent.id}`);
});

//new events
router.get("/new", function (req, res, next) {
  res.render("events/new");
});

//detail event
router.get("/:id", async function (req, res, next) {
  let event = await Event.findById(req.params.id);
  res.render("events/show", { event });
});

router.put("/:id", async function (req, res, next) {
  let event = await Event.findById(req.params.id);

  if (event.author === req.session.user.name) {
    event.title = req.body.title;
    event.time = req.body.time;
    event.body = req.body.body;
    await event.save();
  } else {
    next()
  }


  res.redirect(`/events/${event.id}`);
});

router.delete("/:id", async function (req, res, next) {
  await Event.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

router.get("/:id/edit", async function (req, res, next) {
  let event = await Event.findById(req.params.id);
  res.render("events/edit", { event });
});
router.post("/:id/join", async function (req, res, next) {
  let event = await Event.findOne({ _id: req.params.id })
  event.participants.push(req.session.user.name);
  await event.save()
  res.redirect("/");
});


module.exports = router;
