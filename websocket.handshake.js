const express = require("express");

const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "handshake.html"));
});

app.listen(3000);

// * websocket server
const net = require("net");
// * https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener
const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (buffer) => {});
});
