function loop(){
    console.log("I will loop forever")
}
var t=setInterval(loop,500);
setTimeout(function(){
    clearInterval(t);
    console.log("Game over!");
    process.exit();
},5000);