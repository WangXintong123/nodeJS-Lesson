const http=require("http");
const fs=require("fs");
const path=require("path");
var fireName=process.argv[2];
http.createServer(function(req,res){
    var filePath="";
    if(fireName != undefined){
        filePath=path.join(__dirname,"/"+fireName);
        if(fs.existsSync(filePath)){
            fs.open(filePath,"r+",function(err,fid){
                var len=fs.statSync(filePath).size;
                var buf=Buffer.alloc(len);
                fs.read(fid,buf,0,len,0,function(err,by,buff){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.end(buff.toString());
                        res.closeSync(fd);
                    }
                })
            })
        }
        else{
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
            res.end("文件不存在");
        }
    }
    else{
        filePath=path.join(process.argv[1]);
        fs.open(filePath,"r+",function(err,fid){
            var len=fs.statSync(filePath).size;
            var buf=Buffer.alloc(len);
            fs.read(fid,buf,0,len,0,function(err,by,buff){
                if(err){
                    console.log(err);
                }
                else{
                    res.end(buff.toString());
                    res.closeSync(fid);
                }
            })
        })
    }

    // fs.open(filePath,"r+",function(err,fid){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         var len=fs.statSync(filePath).size;
    //         var buf=Buffer.alloc(len);
    //         fs.read(fid,buf,0,len,0,function(err,bytesRead,data){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 res.end(data.toString());
    //             }
    //             fs.close(fid,function(err,data){
    //                 if(err){
    //                     console.log(err);
    //                 }
    //             });
    //         });
    //     }
    // })
    
}).listen(8081);