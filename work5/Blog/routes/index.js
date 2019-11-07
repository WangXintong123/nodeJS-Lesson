var express = require('express');
var router = express.Router();
var content=require("../data.json");
var users=content.users[0];
var chapterList=content.chapterList;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',function(req,res,next){
  var username=req.body.username;
  var pwd=req.body.pwd;
  if(username==users.username && pwd==users.password){
    res.render('list',{chapterList:chapterList})
  }
  else{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    res.end("用户名或密码错误")
  }
})
module.exports = router;
