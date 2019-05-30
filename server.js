const express = require("express");
const helmet = require("helmet");

const router = require("./router/router.js");

const server = express();

server.use(express.json());
server.use("/api/zoos", router);

module.exports = server;
