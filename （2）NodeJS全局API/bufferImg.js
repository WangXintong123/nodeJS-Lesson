const http=require("http");
const fs=require("fs");
const path=require("path");
http.createServer(function(req,res){
    var imgPath=path.join(__dirname,"view/yb.jpg");
    var imgBuf=fs.readFileSync(imgPath);
    var base64=imgBuf.toString("base64");
    var imgSrc="data:image/jpg;base64,"+base64;
    var htmlStr="<!DOCTYPE html><head></head>"+"<body><img src='"+imgSrc+"'/></body>"+"</html>";
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(htmlStr);
    res.end();
}).listen(8081);
console.log("sever is listening 8081");