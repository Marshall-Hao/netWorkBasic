const express = require("express");

const app1 = express();
app1.get("/", (req, res) => {
  res.send("hello");
});

app1.listen(3000);

const app2 = express();

app2.options("/api", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  //   * 允许多个header
  res.set(
    "Access-Control-Allow-Headers",
    "content-type,token"
  );
  //  * 允许复杂的请求，不限制简单请求
  res.set("Access-Control-Allow-Methods", "PUT");
  //   * send 东西回来
  res.sendStatus(200);
});

app2.get("/api", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.send("go");
});

app2.post("/api", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.send("go");
});

app2.put("/api", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.send("put");
});

app2.listen(3001);
