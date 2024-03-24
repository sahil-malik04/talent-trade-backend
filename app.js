require("dotenv").config({ path: "./.env" });
const port = process.env.SERVER_PORT;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const routes = require("./api/routes");
const { testConnection } = require("./api/config/db");
const { instructorModel } = require("./api/models/instructorModel");

testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
