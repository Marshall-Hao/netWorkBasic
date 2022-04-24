// * 指数补偿 帮助在网络环境差的时候做多次请求，0 ～ 1600ms
const fetch = require("node-fetch");

function wait(ms, fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
}

function request(url) {
  let resolved = false;
  let t = 1;

  return new Promise((resolve) => {
    //   * 闭包
    function doFetch() {
      if (resolved || t > 16) {
        return;
      }
      fetch(url)
        .then((resp) => {
          return resp.text();
        })
        .then((data) => {
          if (!resolved) {
            resolve(data);
            resolved = true;
          }
        });

      setTimeout(() => {
        doFetch();
        t *= 2;
      }, t * 100);
    }
  });
}

// * 时间窗口
function hash(...args) {
  return args.join(",");
}

function windowIt(f, time = 50) {
  let w = {};
  let flag = false;

  return (...args) => {
    return new Promise((resolve) => {
      if (!w[hash(args)]) {
        w[hash(args)] = {
          func: f,
          args,
          resolvers: [],
        };
      }

      if (!flag) {
        flag = true;
        setTimeout(() => {
          Object.keys(w).forEach((key) => {
            const { func, args, resolvers } = w[key];
            func(...args)
              .then((resp) => resp.text())
              .then((text) => {
                resolvers.forEach((r) => {
                  r(text);
                });
                flag = true;
                w = {};
              });
          });
        }, time);
      }

      w[hash(args)].resolvers.push(resolve);
    });
  };
}

// * 20ms 之内，只fetch一次， then n 次
const requestNew = windowIt(fetch, 20);
