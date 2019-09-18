const fs=require("fs");
const path=require("path");
var work=[];
var message=["请输入要创建的文件夹：",
            "请输入要创建的文件：",
            "请输入要删除的文件："];
var i=1;
console.log(message[0]);
process.stdin.on("data",function(data){
    work[message[i-1]]=data.toString("utf8");
    
    if(i==1){
        var dirname=data.toString().slice(6,13);
        fs.mkdirSync(dirname);
        console.log("文件目录创建成功！")
    }
    else if(i==2){
        var filename=data.toString().slice(6,14);
        var filePath=path.join(__dirname,"/filedir/"+filename);
        fs.writeFileSync(filePath,"hello node");
        console.log("文件创建成功！")
    }
    else{
        var filename=data.toString().slice(7,15);
        var filePath1=path.join(__dirname,"/filedir/"+filename);
        fs.unlinkSync(filePath1);
        process.exit();
    }
    console.log(message[i++]);
})



// const fs=require("fs");
// const path=require("path");
// console.log("创建文件夹：");
// process.stdin.on("data",function(data){
//     var cmd=data.toString();
//     var cmdArr=cmd.split(" ");
//     var pathName=path.join
//     switch(cmdArr[0]){
//         case "mkdir":
//             fs.mkdirSync(cmdArr[1].slice(0,-2));
//             break;
//         case "touch":
//             var filePath=path.join(__dirname,"/filedir/"+cmdArr[1].slice(0,-2));
//             fs.writeFileSync(filePath,"hello node");
//             break;
//         case "delete":
//             var filePath=path.join(__dirname,"/filedir/"+cmdArr[1].slice(0,-2));
//             fs.unlinkSync(filePath);
//             break;
//         default:
//             console.log("something error");
//             break;
        
//     }
// })
