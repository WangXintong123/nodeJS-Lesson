var events=require('events');
var util=require('util');
const EventEmitter=events.EventEmitter
function Radio(name,hz){
    EventEmitter.call(this);
    this.name=name;
    this.hz=hz;
    var that=this;
    this.play=function(){
        console.log(this.name+" "+this.hz+" opened");
        setTimeout(function(){console.log("lalala...")},2000)
        
    } 
    this.stop=function(){
        setTimeout(function(){
            console.log(that.name+" "+that.hz+" closed");
        },2000)
        
    }
}
util.inherits(Radio,events.EventEmitter);
// Radio.prototype.onEvent=function(eventName,callback){
//     this.emitter.on(eventName,callback);
// }
 
// Radio.prototype.emitEvent=function(eventName,arg){
//     this.emitter.emit(eventName,arg);
// }
 
module.exports={
    Radio:Radio
}