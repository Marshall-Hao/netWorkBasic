const app = require("express")();

const fs = require("fs");

const path = require("path");

// * 绝对路径
const pageDir = path.resolve(__dirname, "pages");

const htmls = fs.readdirSync(pageDir);

function displayHtmlFile(name) {
  return (req, res) => {
    const filePath = path.resolve(pageDir, name + ".html");
    res.sendFile(filePath);
  };
}

htmls.forEach((file) => {
  const [name, ext] = file.split(".");
  // * 针对不同文件都产生路由
  app.get("/" + name, displayHtmlFile(name));
});

app.listen(3000);
