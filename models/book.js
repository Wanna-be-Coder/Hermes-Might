var mongoose = require("mongoose");
var booksSchema = new mongoose.Schema({
    transactionid:String,
    status:Boolean,
	author: {
		id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
		},
		username:String
    },
    campground:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campground"
      }]

    }

    

);

module.exports = mongoose.model("Book",booksSchema);
