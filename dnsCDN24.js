// * https -  scheme 协议

// * www.example.com -host 主机

// * :8080 -port 主机的某个端口

// * /books? -path 应用的资源路径

// * id=1000 -query 客户端更自由方式的查询

// * #Good -fragment 找到页面的某个位置

// ! DNS (Domain Name System) 域名系统

/**
 * *userside (www.baidu.com) then will goto the DNS,
 * * the dns will tell the ip address of baidu.com
 * * the user can use this ip address to request the content from actual baidu
 * * baidu return the content
 */

/**
 * ! DNS Query
 * ~1 访问本地的DNS 获取域名的IP地址
 * ~2 当当地的人从来没有人访问过某个网址, 就去根服务器（root server),根据域名的.com，告诉用户浏览器去.com 顶级域名服务器
 * ~3 .com也不知道信息的话，那么帮用户在定向到可能存储次网址域名权威域名服务器（AUthoritative name server)
 * ~4 返回AA， authority answer, 本地服务商就保留这个信息了，之后不用再去请求了
 */

// * Resource Record

// * www.example.com    IN(internet类型) A(A记录) 139.18.28.5; (IPV4 地址)

// * www.zhihu.com  (IPV6 地址)
// * 1251625956.s2txipv6.cdntip.com. 103 IN AAAA记录 240e:940:401:1:1a::

// ! CNAME记录 （Canonical Name Record) 别名记录
// * a.example.com IN CNAME b.example.com

// !MX记录 （Mail exchanger record）

// !NS记录 （Name Server Record）
// * a.zhihu.com 假设前面DNS Query都找不到，那么可以询问NS记录

// !SOA记录 (Start of Authority Record)
// * 定义多个ns服务器哪个是主服务器，分布式ns服务器，多于一台

// !TXT记录

// ? CDN （Content Delivery Network） 内容分发网络

// * 就近节点获取资源，理解notion的图，主要理解cdn回源，静态资源适合cdn
