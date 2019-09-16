var stream=require("stream");
var Readable=stream.Readable;
function MyReadable(){
    Readable.call(this);
}

MyReadable.prototype.__proto__=Readable.prototype;

var myRead=new MyReadable();
for(var i=97;i<=122;i++){
    myRead.push(String.fromCharCode(i))
}
myRead.push(null);
myRead.pipe(process.stdout);