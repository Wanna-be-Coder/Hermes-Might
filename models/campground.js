var mongoose = require("mongoose");
var campgroundsSchema = new mongoose.Schema({
	name : String,
	image: String,
	description:String,
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }],
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  },
  latitude :String,
  longitude :String
});

module.exports = mongoose.model("Campground",campgroundsSchema);
