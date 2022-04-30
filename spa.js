const app = require("express")();
const path = require("path");

const htmlFile = path.resolve(__dirname, "pages/spa.html");
// * /products /products/1 多个路由指向一个
app.get(/\/product(s|\/d+)/, (req, res) => {
  res.sendFile(htmlFile);
});
app.listen(3000);
