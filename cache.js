const express = require("express");

const app = express();

// * etag看是否内容是否一致，是否更新，最常见的协商缓存
app.set("etag", false);
app.get("/x", (req, res) => {
  // * 强制缓存长久不会变化的资源
  //   res.set("Cache-Control", "max-age=600");
  //   console.log("-------------");
  // * 如果修改了last-modify时间才给新的responsse，更好控制，要看if-modify-change和last-modify是不是一样
  res.set(
    "Last-Modified",
    "Thu Apr 28 2022 00:46:37 GMT+0800"
  );
  res.send("x5");
});

app.listen(3000);
