function memory(f, maxSize = 10) {
  let cache = [];

  return (...args) => {
    const hash = args.join(",");
    const item = cache.find((x) => x.hash === hash);
    if (item) {
      cache.time = new Date().getTime();
      console.log(cache);
      return item.value;
    }

    const result = f(...args);
    cache.push({
      hash,
      value: result,
      time: new Date().getTime(),
    });

    if (cache.length > maxSize) {
      let min = Infinity;
      let minItem = null;
      for (let item of cache) {
        if (item.time < min) {
          min = item.time;
          minItem = item;
        }
      }
      cache = cache.filter((x) => x !== minItem);
    }

    return result;
  };
}

function _fib(n) {
  if (n == 1 || n == 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fib = memory(_fib);
console.log(_fib(50));
