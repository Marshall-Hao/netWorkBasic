function memory(f, maxSize = 10) {
  const cache = [];

  return (...args) => {
    const hash = args.join(",");
    const item = cache.find((x) => x.hash === hash);
    if (item) {
      console.log(cache);
      return item.value;
    }

    const result = f(...args);
    cache.push({
      hash,
      value: result,
    });

    if (cache.length > maxSize) {
      cache.shift();
    }

    return result;
  };
}

// 1 1 2 3 5 8
function _fib(n) {
  if (n == 1 || n == 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fib = memory(_fib);
console.log(_fib(30));
