/*
1.使用mongoose 连接数据库，连接语法如下；
 */


var mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;
var Schema = mongoose.Schema;
db.on('error',function callback() {
    console.log("Connection error")
});
db.once('open',function callback() {
    console.log("connect");

})
//数据库连接完成
//创建数据库模板
var ListSchema = new mongoose.Schema({
    user_id: String,
    content:String,
    updated_at:Date
});
mongoose.model('user',ListSchema);
//联系population
var listSchema = new Schema({
    name: String,
    age: Number,
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
mongoose.model('list', listSchema);

var postSchema = new Schema({
    title: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'list'},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
mongoose.model('post', postSchema);

var commentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'list'}
})
 mongoose.model('comment', commentSchema);



module.exports = mongoose;

