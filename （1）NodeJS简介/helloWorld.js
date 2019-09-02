const http= require("http");
var server=http.createServer(function(req,res){
    res.write("hello world");
    res.end();
});
server.listen(8081);
console.log("server is listening 8081");