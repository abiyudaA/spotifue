const express = require("express");
const app = express();
const index = require("./routers/index.js");
const session = require("express-session");
const path = require("path");
const port = 3000;

app.use("/uploads", express.static(path.join(__dirname, "helpers/uploads")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      samSite: true,
    },
  })
);

app.use("/", index);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
