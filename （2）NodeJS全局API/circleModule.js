//实验5
// function circleFun(r){
//     function circumference(){
//         return 2*r*Math.PI;
//     }
//     function area(){
//         return r*r*Math.PI;
//     }
//     var obj={
//         "circumference":circumference(),
//         "area":area()
//     }
//     return obj;
// }
// module.exports={
//     circleFun:circleFun
// }

//实验6
var circleObj={
    circumference:circumference,
    area:area
}
function circumference(r){
    return 2*r*Math.PI;
}
function area(r){
    return r*r*Math.PI;
}
module.exports={
    circleObj:circleObj
}