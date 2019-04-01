var mongo = require('mongoose');
var Schema = mongo.Schema;
var UserSchema = new Schema({
    userid: String,
    name: String,
    password: String
});

exports.loginUser = mongo.model('loginUser', UserSchema);