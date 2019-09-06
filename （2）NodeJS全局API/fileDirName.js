//引入http原生模块
const http=require("http");
const fs=require("fs");
const path=require("path");
//创建一个服务器
//当客户端的http发起请求时才会调用回调函数里的内容
var server=http.createServer(function(req,res){
    var htmlPath=path.join(__dirname,"/view/index.html");
    var htmlContent=fs.readFileSync(htmlPath);
    console.log(htmlPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(htmlContent);
    res.end();
});
//服务监听一个端口
server.listen(8080);
console.log("server is listening 8080")