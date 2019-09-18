const fs=require("fs");
const path=require("path");
var name=process.argv[2];
var filePath=path.join(__dirname,"/"+name);
if(fs.existsSync(filePath)){
    var statObj=fs.statSync(filePath);
    if(statObj.isFile()){
        fs.unlinkSync(filePath);
    }
    else{
        deleteDir(filePath);
    }
}
else{
    console.log("not exist");
}

function deleteDir(pathName){
    var files=fs.readdirSync(pathName);
    for(var i=0;i<files.length;i++){
        var pathName1=path.join(pathName,files[i]);
        var statObj=fs.statSync(pathName1);
        if(statObj.isFile()){
            fs.unlinkSync(pathName1);
        }
        else if(statObj.isDirectory()){
            deleteDir(pathName1);
        }
    }
    fs.rmdirSync(pathName);
}