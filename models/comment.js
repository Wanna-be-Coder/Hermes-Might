var mongoose = require("mongoose");
var commentsSchema = new mongoose.Schema({
	text : String,
	author: {
		id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
		},
		username:Array
	}

});

module.exports = mongoose.model("Comment",commentsSchema);
