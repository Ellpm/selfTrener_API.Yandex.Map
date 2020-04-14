const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const indexRouter = require("./routes/index");
const eventsRouter = require("./routes/events");

const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sports", {
  useNewUrlParser: true
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    key: "user_sid",
    secret: "anything here",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
      httpOnly: false
    }
  })
);

app.use(express.static(path.join(__dirname, "public")));



app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {

      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(function(req, res, next) {
  app.locals.user = req.session.user;
  next();
});

app.use("/", indexRouter);
app.use("/events", eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
