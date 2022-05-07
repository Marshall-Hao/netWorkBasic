const puppeteer = require("puppeteer");

const queue = ["https://www.bilibili.com/"];
const findCards = () => {
  //   * 浏览器进程
  return new Promise((resolve, reject) => {
    function getText(node, cls) {
      if (node.querySelector(cls)) {
        return node.querySelector(cls).innerText;
      }
      return null;
    }
    function next(n, callback) {
      if (n > 0) {
        window.scrollBy(0, window.innerHeight);
      } else {
        callback();
        return;
      }

      setTimeout(() => {
        next(n - 1, callback);
      }, 1000);
    }

    next(2, () => {
      const cards = document.querySelectorAll(
        ".bili-video-card"
      );
      try {
        resolve(
          [...cards].map((card) => {
            if (!card.querySelector("a")) {
              return;
            }
            let title = getText(
              card,
              ".bili-video-card__info--tit"
            );
            let up = getText(
              card,
              ".bili-video-card__info--author"
            );
            let link =
              card.querySelector("a") &&
              card.querySelector("a").href;
            return { title, up, link };
          })
        );
      } catch (e) {
        reject(e);
      }
    });
  });
};

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  while (queue.length > 0) {
    const url = queue.pop();
    const data = await analyse(page, url);
    store(data);
  }
}

async function analyse(page, url) {
  await page.goto(url);
  let cards = "";
  if (url === "https://www.bilibili.com/") {
    cards = await page.evaluate(findCards);
    cards.forEach((card) => {
      if (card) {
        queue.push(card.link);
      }
    });
    return cards;
  } else {
    console.log("analyze page " + url);
  }
}

function store(data) {
  console.log(data);
}
start();
