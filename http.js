// ! HTTP(Hyper Text Transfer Protocol)

// ! 纯文本 无状态
// * 应用层协议 （TCP/Ip）

// * 信息纯文本传输

// * 无状态 每次请求独立

// * 维护状态浏览器 （Cookie, Session, storage etc)

// * HTTP 0.9 ～ 1.0 ～ 1.1 ～ 2.0

// ? 设计的基础因素

// * 带宽

// * 延迟
/**
 * ~liulanqi
 * ~DNS查询
 * ~TCP(三次握手)
 */

// !HTTPS (Hyper Text Transfer Protocol Secure) check notion pic

// ?TCP/IP (传输 网络协议)

const net = require("net");
const response = `HTTP/1.1 200 OK
Date: Sun, 10 April 2022 20:58:00 GMT
Content-Type: text/plain
Connection: Closed

Hello World
`;

const server = net.createServer((socket) => {
  socket.end(response);
});

server.listen(80, () => {});
