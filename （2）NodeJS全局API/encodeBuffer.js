var username=process.argv[2];
var password=process.argv[3];

console.log("用户名：%s 密码：%s",username,password);
if(username!=undefined && password!=undefined){
    var buf=Buffer.from(username+":"+password,"utf8");
    var base64=buf.toString("base64");
    console.log("base64加密:%s",base64);
}