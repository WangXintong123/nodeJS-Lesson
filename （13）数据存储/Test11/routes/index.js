var express = require('express');
var router = express.Router();
var mysql=require("mysql");
var dbconfig=require("../config/dbconfig.json")
var url=require("url")

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',function(req,res,next){
  var username=req.body.username
  var pwd=req.body.pwd
  var con=mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from users",function(err,result){
    if(err){
      console.log(err)
    }
    else{
      if(username==result[0].username && pwd==result[0].pwd){
        res.render("list")
      }
      else{
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.end("用户名或密码错误")
      }
    }
  })
})

router.get('/addChapter',function(req,res,next){
  res.render("addChapter")
})
router.post('/addChapter',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;
  var con=mysql.createConnection(dbconfig);
  con.connect();
  con.query("insert into chapters(title,content) values(?,?)",[title,content],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.end("insert success");
    }
  })
})

router.get("/chapterList",function(req,res,next){
  var con=mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from chapters",function(err,result){
    if(err){
      console.log(err)
    }else{
      res.render("chapterList",{list:result})
    }
  })
  
})

router.get("/chapter",function(req,res,next){
  var urlObj=url.parse(req.url)
  var id=urlObj.query;
  var page=id.split("=")[1];
  var con=mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from chapters",function(err,result){
    if(err){
      console.log(err)
    }else{
      res.render("chapter",{"list":result,"id":page})
    }
  })
})
module.exports = router;
