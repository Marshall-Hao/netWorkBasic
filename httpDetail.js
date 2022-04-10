/**
 * ! 状态码
 * ~101 切换协议
 * ~2xx 成功
 * ~3xx 重定向
 * ~4xx 客户端错误
 * ~5xx 服务端错误
 */

const express = require("express");

const app = express();

app.get("/greetings", (req, res) => {
  res.send("Hi!");
});

app.post("/product", (req, res) => {
  const contentType = req.headers["content-type"];
  let body = null;
  let requestText = "";
  req.on("data", (buffer) => {
    //   8bit - byte
    requestText += buffer.toString("utf-8");
  });

  req.on("end", () => {
    switch (contentType) {
      case "application/json":
        body = JSON.parse(requestText);
        res.set("content-type", "application/json");
        res
          .status(201)
          .send(JSON.stringify({ success: 1 }));
        break;
    }
  });
});

app.put("/product/:id", (req, res) => {
  console.log(req.params.id);
  res.sendStatus(204);
});

app.delete("/product/:id", (req, res) => {
  console.log(req.params.id);
  res.sendStatus(204);
});

//  * 与 seo 优化有关
// * redirect
app.get("/301", (req, res) => {
  res.redirect(301, "/def");
});

app.get("/302", (req, res) => {
  res.redirect(302, "/def");
});

app.get("/303", (req, res) => {
  res.redirect(303, "/def");
});

app.post("/307", (req, res) => {
  res.redirect(307, "/def");
});

app.get("/def", (req, res) => {
  res.send("this is def(GET) ");
});

app.post("/def", (req, res) => {
  res.send("this is def(GET) ");
});

// * error handling
app.get("/abc", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {});
