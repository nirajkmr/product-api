"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes.js");
const url = require("url");
const querystring = require("querystring");

const init = async () => {
  console.log(process.env);
  const app = express();

  // parse requests of content-type: application/json
  app.use(bodyParser.json());

  // parse requests of content-type: application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", routes());
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder applications." });
  });

  // set port, listen for requests
  app.listen(4471, () => {
    console.log("Server is running on port 3000.");
  });
};
init();
