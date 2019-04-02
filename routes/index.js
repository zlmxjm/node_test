var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./model');
var TodoModel = mongoose.model('user');
var loginUserModel = models.loginUser;
var URL = require('url');
//用来设置单独接口的跨域。router.post('/create',cros,function (req,res) {})
function cros(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
}
router.use(cros);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/map',function (req,res) {
  res.sendfile('./views/map.html');
})
router.post('/register',function (req,res,) {
  new loginUserModel({
    userid: req.body.userid,
    password:req.body.password
  }).save(function (err, todo, count) {
      res.redirect('/login');
  })
})
//登录注册功能
router.get('/tologin',function (req,res) {
  res.sendfile('./views/login.html');
})
router.get('/welcome',function (req,res) {
  res.sendfile('./views/welcome.html');
})

router.get('/login',function (req,res) {
  const params = URL.parse(req.url,true).query;
  var query_doc = { userid: req.body.userid, password: req.body.password };
  console.log(params,'params')
  loginUserModel.count(params, function(err, doc){
    if(doc == 1){//验证成功,转到 欢迎页面
      res.json(doc);
    }else{
      res.json(err);
    }
  });
})
router.get('/logout', function(req, res) {//注销,转到登录页面
  res.redirect('/tologin');
});


router.post('/create',function (req,res) {
  console.log('req.body',req.body);
  console.log('time',Date.now());

  new TodoModel({ //实例化对象，新建数据
    content: req.body.content,
    updated_at: Date.now()
  }).save(function(err, todo, count) { //保存数据
    console.log(err,'内容', todo, '数量', count); //打印保存的数据
    res.redirect('/'); //返回首页
  })

});
router.get('/search',function (req,res,next) {
  TodoModel.find().sort('updated_at').exec(function(err, aa, count) {
    // res.send(aa)
    res.json(aa);
  });
})
router.get('/edit',function (req,res,next) {
  const params=URL.parse(req.url,true).query;
console.log('params',params)
  TodoModel.findById(params.id,function(err,todo){
    // res.redirect('edit'); //返回首页
    res.send(todo);
  })
})
router.get('/destory',function (req,res,next) {
  const params = URL.parse(req.url,true).query;
  TodoModel.findById(params.id,function (err,todo) {
    todo.remove(function () {
      // res.redirect('/');
      res.send({
          status:1,
          msg:"删除成功",
          data:null
      });
    })
  })
})
module.exports = router;
