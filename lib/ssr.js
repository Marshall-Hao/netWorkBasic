const app = require("express")();
const render = require("../render");
const path = require("path");

const html = render(
  {
    name: "div",
    props: {
      onClick: () => {
        window.alert("123");
      },
    },
    children: [
      {
        name: "ul",
        children: [
          {
            name: "li",
            children: "Apple",
          },
          {
            name: "li",
            children: "Tesla",
          },
        ],
      },
    ],
  },
  "html"
);

app.get("/page-ssr.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "page-ssr.js"));
});

app.get("/page.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "page.js"));
});

app.get("/", (req, res) => {
  res.send(`<html>
  <body>
  <div id="root">
  </div>
  <script src='/page.js' type="module" ></script>
  </body>
  </html>`);
});

app.get("/ssr", (req, res) => {
  res.send(`<html>
    <body>
    <div id="root">
    ${html}
    </div>
    <script src='/page-ssr.js' type="module"></script>
    </body>
  </html>`);
});

app.listen(3000);
