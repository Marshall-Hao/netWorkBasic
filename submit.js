const express = require("express");

const path = require("path");

const app = express();

const fileUpload = require("express-fileupload");

const bodyParser = require("body-parser");
const fs = require("fs");

app.get("/submit", (req, res) => {
  res.sendFile(path.resolve(__dirname, "form.html"));
});

app.get("/submit64", (req, res) => {
  res.sendFile(path.resolve(__dirname, "submit64.html"));
});

app.get("/submitbinary", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "submitbinary.html")
  );
});

app.post("/submit", fileUpload(), (req, res) => {
  console.log(req.files);
  req.files.file.mv(
    path.resolve(__dirname, "upload/b.png")
  );
  res.status(201).send("OK");
});

// * base64 会导致 1.33倍 3个字母4个base64表达
app.post("/submit64", bodyParser.json(), (req, res) => {
  const buffer = new Buffer(req.body.data, "base64");
  fs.writeFileSync(
    path.resolve(__dirname, "upload/x.png"),
    buffer
  );
  res.send("ok");
});

app.post("/submitbinary", fileUpload(), (req, res) => {
  console.log(req.files);
  req.files.file.mv(
    path.resolve(__dirname, "upload/c.png")
  );
  res.status(201).send("OK");
});
app.listen(3000);
