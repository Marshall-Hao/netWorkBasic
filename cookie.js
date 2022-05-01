const express = require("express");
const app1 = express();
const app2 = express();

app1.set("etag", false);
app2.set("etag", false);

app1.get("/", (req, res) => {
  // * 不建议跨主域发cookie
  res.setHeader("Set-Cookie", "abc=123;SameSite=None");
  res.send("ok");
});

app1.get("/api", (req, res) => {
  res.send("ok");
});

// * 跨子域请求cookie
app2.get("/", (req, res) => {
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", "abc=123");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  //   * inclue credential
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("ok");
});

app1.listen(3000);
app2.listen(3001);
