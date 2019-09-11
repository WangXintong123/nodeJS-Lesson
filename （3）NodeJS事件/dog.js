const event=require("events");
const EventEmitter=event.EventEmitter
function Dog(name,energy){
    EventEmitter.call(this);
    this.name=name;
    this.energy=energy;
    var that=this;
    var t=setInterval(function(){
        if(that.energy>=0){
            that.emit("bark");
            that.energy--;
        }
        else{
            clearInterval(t);
        }
    },1000)
}
Dog.prototype.__proto__=EventEmitter.prototype;
module.exports={
    Dog:Dog
}
