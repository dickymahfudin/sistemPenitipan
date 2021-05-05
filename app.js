const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

require("dotenv").config();

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const perpanjangRouter = require("./src/routes/perpanjang");
const historyRouter = require("./src/routes/history");
const loginRouter = require("./src/routes/login");
const midleware = require("./src/midleware");

const app = express();
app.use(
  session({
    cookie: { maxAge: 6000000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/dashboard", midleware, indexRouter);
app.use("/user", midleware, usersRouter);
app.use("/perpanjang", midleware, perpanjangRouter);
app.use("/api/history", historyRouter);
app.use("/login", loginRouter);

app.get("*", midleware, (req, res) => res.redirect("/dashboard"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
