var mongoose = require("mongoose");
    Campground = require("./models/campground");
    Comment = require("./models/comment")

var data=[
{
  name:"Clouds Rest",
  image:"https://images.pexels.com/photos/965153/pexels-photo-965153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet quam convallis semper aliquam. Proin feugiat vitae libero sed finibus. Etiam magna dolor, venenatis et accumsan pretium, egestas sed mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce egestas sem sem, vitae porttitor lectus fringilla nec. Vestibulum a magna massa. Donec et feugiat nisl. Curabitur maximus at urna sit amet elementum. Aliquam erat volutpat. Duis efficitur tellus quis porttitor porttitor. Integer non libero non purus egestas sagittis eget sed urna."
},
{
  name:"Bangabondhu Rest",
  image:"https://images.pexels.com/photos/1252399/pexels-photo-1252399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet quam convallis semper aliquam. Proin feugiat vitae libero sed finibus. Etiam magna dolor, venenatis et accumsan pretium, egestas sed mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce egestas sem sem, vitae porttitor lectus fringilla nec. Vestibulum a magna massa. Donec et feugiat nisl. Curabitur maximus at urna sit amet elementum. Aliquam erat volutpat. Duis efficitur tellus quis porttitor porttitor. Integer non libero non purus egestas sagittis eget sed urna."
},
{
  name:"Giaurrahman Rest",
  image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet quam convallis semper aliquam. Proin feugiat vitae libero sed finibus. Etiam magna dolor, venenatis et accumsan pretium, egestas sed mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce egestas sem sem, vitae porttitor lectus fringilla nec. Vestibulum a magna massa. Donec et feugiat nisl. Curabitur maximus at urna sit amet elementum. Aliquam erat volutpat. Duis efficitur tellus quis porttitor porttitor. Integer non libero non purus egestas sagittis eget sed urna."
}
];

function seedDB(){
  //Remove all campgrounds
    Campground.remove({},function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("deleted");
      }
    });
    //add a few campground
    // data.forEach(function(seed){
    //   Campground.create(seed,function(err,campground){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log("done");
    //       //create comment
    //       Comment.create({
    //         text:"This place is lovely",
    //         author:"Camper"
    //       },function(err,comment){
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //           campground.comments.push(comment);
    //           campground.save();
    //           console.log("Created new comment");
    //         }
    //       });
    //     }
    //   });
    // });
  }

  module.exports=seedDB;
