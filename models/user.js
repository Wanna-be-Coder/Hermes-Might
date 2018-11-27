var mongoose = require("mongoose");
var passportLocalMongooose = require("passport-local-mongoose");



var UserSchema = mongoose.Schema({
    username:String,
    password:String,
    role:Array
});

UserSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model("User",UserSchema);
