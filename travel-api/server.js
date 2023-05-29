const { urlencoded } = require("express");
const express = require("express");
const axios = require("axios");
const auth = require("./app/routers/auth");
const routes = require("./app/routers/routes");
require("dotenv").config();
const db = require("./db/models/index");

const app = express();
const port = process.env.PORT || 3048;

(async () => {
  await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
})();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/test", (req, res) => {
  axios
    .get("http://localhost:3048/ping")
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(500).send("Error hitting the endpoint");
    });
});

app.use("/travel", auth);
app.use("/travel", routes);
