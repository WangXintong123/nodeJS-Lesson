var arg=process.argv[2];
if(arg==undefined){
    console.log("帮助信息：请输入与参数！")
}
else if(arg=="-h"){
    console.log("帮助信息：请输入要计算的算术运算式！")
}
else{
    console.log("%s=%d",arg,eval(arg));
}