const http=require("http");
const path=require("path");
const fs=require("fs");
const url=require("url");

http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    var pathName=urlObj.pathname;
    if(pathName=='/'){
        showIndex(res);
    }
    else if(pathName=="/list"){
        showList(res);
    }
    else if(pathName=='/image.png'){
        showImg(res);
    }
    else if(pathName=='/upload' && req.method=="POST"){
        uploadFile(req,res);
    }
    else if(pathName.indexOf("upload")>=0 && req.method=="GET"){
        var imgSrc=path.join(__dirname,pathName);
        var imgContent=fs.readFileSync(imgSrc);
        res.writeHead(200,{"Content-Type":"image/png"});
        res.end(imgContent)
    }
    else if(pathName=="/getlist"){
        var files=fs.readdirSync(__dirname+"/upload");
        var fileStr=JSON.stringify(files);
        res.end(fileStr);
    }

}).listen(8081);
/**
 * 地址栏中发起的http请求
 * 超链接发起http
 * 提交表单发起请求
 * ajax发起请求
 * <script src>
 * background:url()
 */

function showIndex(res){
    var htmlPath=path.join(__dirname,"/index.html");
    var htmlCon=fs.readFileSync(htmlPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(htmlCon);
    res.end();
}

function showImg(res){
    var imgPath=path.join(__dirname,"image.png");
    var imgCon=fs.readFileSync(imgPath);
    res.writeHead(200,{"Content-Type":"image/png"});
    res.write(imgCon);
    res.end();
}

function showList(res){
    var listPath=path.join(__dirname,"/list.html");
    var listCon=fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write(listCon);
    res.end();
}

function uploadFile(req,res){
    var dataStr="";
    req.setEncoding("binary");
    req.on("data",function(chunk){
        dataStr+=chunk;
    })
    req.on("end",function(){
        var totalArr=dataStr.split('\r\n');
        var bufArr=totalArr.slice(4,totalArr.length-2);
        bufArr=bufArr.join("\r\n");
        var imgData=Buffer.from(bufArr,"binary");
        fs.writeFileSync("./upload/file.png",imgData,{"encoding":"binary"});
        res.end("submit success");
    })
}
