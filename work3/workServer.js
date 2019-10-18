const http=require("http");
const url=require("url");
const path=require("path");
const fs=require("fs");
const querystring = require('querystring');
const chapterList=require("./listfile.js").chapterList;
const userList=require("./listfile.js").userList;
http.createServer(function(req,res){
    var reqObj=url.parse(req.url,true);
    var pathName=reqObj.pathname;
    switch(pathName){
        case '/list':
            showContent(res,"chapterList.html");
            break;
        case '/detail':
            showContent(res,"chapter.html");
            break;
        case '/login':
            showContent(res,"login.html")
            break;
        case '/listmanager':
            showContent(res,"list.html");
            break;
        case '/addChapter':
            showContent(res,"addChapter.html");
            break;
        case '/getfilelist':
            getFileList(res);
            break;
        case '/loging':
            beLogining(req,res);
            break;
        case '/add':
            addList(req,res);
            break;
        case '/getDetail':
            changeDetail(res);
            break;
        case '/dellist':
            delList(reqObj,res);
            break;
        default:
                if(!fs.existsSync(path.join(__dirname,pathName))){
                    res.writeHead(404,{"Content-Type":"text/plain"});
                    res.write("error")
                    res.end()
                }
                else{
                    if(!fs.statSync(path.join(__dirname,pathName)).isFile()){
                        res.writeHead(404,{"Content-Type":"text/plain"});
                        res.write("error")
                        res.end()
                    }
                    else{
                        var last=path.extname(path.join(__dirname,pathName));
                        var fileCon=fs.readFileSync(path.join(__dirname,pathName));
                        switch(last){
                            case '.css':
                                res.writeHead(200,{"Content-Type":"text/css"});
                                res.write(fileCon);
                                res.end();
                                break;
                            case '.js':
                                res.writeHead(200,{"Content-Type":"text/javascript"});
                                res.write(fileCon);
                                 res.end();
                                break;
                            case '.jpeg':
                            case '.jpg':
                                res.writeHead(200,{"Content-Type":"image/jpg"});
                                res.write(fileCon);
                                res.end();
                                break;
                            case '.png':
                                res.writeHead(200,{"Content-Type":"image/png"});
                                res.write(fileCon);
                                res.end();
                                break;
                            default:
                                res.writeHead(200,{"Content-Type":"text/plain"});
                                res.write("error");
                                res.end();
                                break;

                        }	
                    }
                }
            break;
    }
}).listen(8083);


function showContent(res,fileName){
    var filePath=path.join(__dirname,fileName);
    var fileContent=fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function getFileList(res){
    var listStr=JSON.stringify(chapterList);
    res.writeHead(200,{"Content-Type":"application/json"});
    res.write(listStr);
    res.end();
}
function beLogining(req,res){
    var str='';
    req.on("data",function(chunk){
        str+=chunk
    })
    req.on("end",function(){
        var obj=querystring.parse(str);
        for(var i=0;i<userList.length;i++){
            if(obj.username==userList[i].username && obj.pwd==userList[i].pwd){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write("success");
                res.end();
                return;
            }
        }
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("error");
        res.end();
    })
}
function addList(req,res){
    var str="";
    req.on("data",function(chunk){
        str+=chunk;
    })
    req.on("end",function(){
        var obj=querystring.parse(str);
        var title=obj.title;
        var content=obj.content;
        var date=new Date();
        var year=date.getFullYear();
        var month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
        var day=date.getDate()<10?'0'+date.getDate():date.getDate();
        var newone={
            "chapterId": chapterList[chapterList.length-1].chapterId+1,
            "chapterName": title,
            "imgPath": "images/1442457564979540.jpeg",
            "chapterDes": title,
            "chapterContent": content,
            "publishTimer": year+"-"+month+"-"+day,
            "author": "admin",
            "views": 1022
        }
        chapterList.push(newone);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("success");
        res.end();
        
    })
}

function changeDetail(res){
    var str=JSON.stringify(chapterList);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(str);
    res.end();
}

function delList(urlObj,res){
    var id=urlObj.query.chapterId;
    for(var i=0;i<chapterList.length;i++){
        if(chapterList[i].chapterId==id){
            chapterList.splice(i,1);
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write("success");
            res.end();
            for(var j=1;j<chapterList.length+1;j++){
                chapterList[j-1].chapterId=j;
            }
            return;
        }
    }
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("error");
    res.end();
}