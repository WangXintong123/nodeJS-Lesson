var base64Str="emhhbmdzYW46MTIzNDU2";
var buf=Buffer.from(base64Str,"base64");
var word=buf.toString("utf8");
console.log(word);