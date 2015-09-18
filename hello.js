
var http = require('http');
http.createServer(function handler(request, respose) {
  respose.writeHead(200, {
    'Content-Type' : 'text/html'
  });
  respose.end('世界你好。\n');
}).listen(8081,'localhost');
console.log("服务器已经启动，地址为：http://localhost:8080")