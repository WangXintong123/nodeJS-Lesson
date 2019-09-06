function Bomb(){

}
Bomb.prototype.message="bomb!!!";
Bomb.prototype.explode=function(){
    console.log(this.message);
}
var b=new Bomb();
setTimeout(function(){
    b.explode();
},2000);