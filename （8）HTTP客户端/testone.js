/**
 * 1.创建server 读取index.html
 *   响应到客户端显示。
 * 2.在页面中发起ajax情求获取数据
 *   服务器端接收到ajax情求，去猫眼网站上爬取页面内容
 *   使用cheerio来解析得到需要的数据，存储到数组里面，响应到客户端
 * 3.在ajax回调函数中使用响应到的数据，拼接到页面上显示
 */
const cheerio=require("cheerio");
const https=require("https");
const http=require("http");
const fs=require("fs");
const url=require("url");
http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    var pathName=urlObj.pathname;
    if(pathName=="/"){
        var fileContent=fs.readFileSync("index.html");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fileContent);
        res.end();
    }
    else if(pathName=="/getlist"){
        var option={
            hostname: 'maoyan.com',
            path: '/films',
            headers: {
              'Accept':'*/*',
              'Accept-Encoding':'utf-8',
              'Accept-Language':'zh-CN,zh;q=0.8',
              'Connection':'keep-alive',
              'Host':'maoyan.com',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
            }
        };
        https.get(option,function(resObj){
            var result="";
            resObj.on("data",function(chunk){
                result+=chunk;
            })
            resObj.on("end",function(){
                const $=cheerio.load(result);
                    var movieList=[];
                    $(".movie-item-title a").each(function(){
                        var movie={};
                        movie.movieId=$(this).attr("data-val").slice(9,-1);
                        //console.log(movie.movieId);
                        movie.movieName=$(this).text();
                        if(isNaN(parseInt($(this).parent().next().text()))){
                            movie.movieRange="暂无评分";
                        }
                        else{
                            movie.movieRange=$(this).parent().next().text();
                        }
                        movie.movieRange=="暂无评分";
                        //console.log(movie)
                        movieList.push(movie);
                    })
                    var str=JSON.stringify(movieList);
                    res.end(str);
                })
        })
    }
}).listen(8081);
