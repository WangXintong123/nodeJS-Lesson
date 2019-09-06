var user={
    Name:"",
    Email:"",
    QQ:"",
    Mobile:""
}
var i=0;
console.log("name:")
process.stdin.on("data",function(data){
    if(i==0){
        user.Name=data.toString();
        i++;
        console.log("email:");
    }
    else if(i==1){
        
        user.Email=data.toString();
        i++;
        console.log("qq:");
    }
    else if(i==2){
        
        user.QQ=data.toString();
        i++;
        console.log("mobile:");
    }
    else if(i==3){
       
        user.Mobile=data.toString();
        console.log("%j",user);
        process.exit();
    }
});
