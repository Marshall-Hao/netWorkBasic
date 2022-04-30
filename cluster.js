const cluster = require("cluster");

const numCPUs = require("os").cpus().length;
const express = require("express");

// * 判断是否在主进程
// * 多进程处理大量请求
if (cluster.isMaster) {
  // * process.pid 进程pid
  console.log(`master ${process.pid}is running`);
  //  Fork works
  for (let i = 0; i < numCPUs; i++) {
    //   * 增加总进程数减一的分支进程
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any tcp connection
  // Http server
  const app = new express();
  app.listen(8080);
  console.log(`worker ${process.pid} started`);
}
