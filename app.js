require("dotenv").config({ path: "./.env" });
const port = process.env.SERVER_PORT;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./api/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
