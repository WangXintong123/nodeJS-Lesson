var express = require('express');
var router = express.Router();
var filelist=require("../listfile")

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',function(req,res,next){
  var username=req.body.username;
  var pwd=req.body.pwd;
  if(username=="zhangsan" && pwd=="123456"){
      res.render("list",{title:"list"})
  }
  else{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    res.end("用户名或密码错误")
  }
})

router.get('/addChapter',function(req,res,next){
  res.render("addChapter",{title:"addchapter"})
})
var list=[]
router.post('/chapterList',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;
  list.push({title,content})
  res.render("chapterList",{result:list})
})
module.exports = router;
