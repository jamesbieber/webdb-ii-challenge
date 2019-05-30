const express = require("express");
const helmet = require("helmet");

const server = require("./server.js");

const port = 3000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
