const http=require("http");
const fs=require("fs");
const path=require("path");
var fireName=process.argv[2];
http.createServer(function(req,res){
    if(fireName != undefined){
        var filePath=path.join(__dirname,"/"+fireName);
        if(fs.existsSync(filePath)){
            var streamReader=fs.createReadStream(filePath);
            streamReader.pipe(res);
        }
        else{
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.end("文件不存在");
        }
    }
    else{
        var filePath=path.join(process.argv[1]);
        var streamReader=fs.createReadStream(filePath);
        streamReader.pipe(res);
    }
    
}).listen(8081);