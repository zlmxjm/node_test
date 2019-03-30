var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var listModel = mongoose.model('list');
var postModel = mongoose.model('post');
var commentModel = mongoose.model('comment');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/ceshi',function (req,res,next) {
    new listModel({ //实例化对象，新建数据
        name: 'Tom',
        age: 19
    }).save(function(err, todo, count) { //保存数据
        console.log(err,'内容1', todo, '数量', count); //打印保存的数据
    })
    new postModel({ //实例化对象，新建数据
        title: 'test',
        content: 'wofkjeoai'
    }).save(function(err, todo, count) { //保存数据
        console.log(err,'内容2', todo, '数量', count); //打印保存的数据
    })
    new commentModel({ //实例化对象，新建数据
        content: 'woshixijingmei',
    }).save(function(err, todo, count) { //保存数据
        console.log(err,'内容3', todo, '数量', count); //打印保存的数据
    })
    commentModel.findOne({'content':'woshixijingmei'}).populate({
        path:'author',
        select:'name'
    }).exec().then(function(user) {
        console.log(1111)
        console.log(user);
    }).catch(function(reason) {
        console.log(reason);
    });
});
module.exports = router;

