const dog=require("./dog.js");
var taidi=new dog.Dog("tidi",5);
taidi.on("bark",function(){
    console.log(this.name+" barked!"+" energy:"+this.energy);
});
var zangao=new dog.Dog("zangao",8);
zangao.on("bark",function(){
    console.log(this.name+" barked!"+" energy:"+this.energy);
});