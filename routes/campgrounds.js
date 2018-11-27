var express = require("express");
var router = express.Router({mergeParamas:true});
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
var User = require("../models/user");



//Index Route



router.get("/campgrounds",middleware.isLoggedIn,function(req,res){
	Campground.find({},function(err,allcampgrounds)
{
	if(err){console.log(err);}

	else{

		User.findById
		
			

				res.render("campgrounds/index",{grounds:allcampgrounds});
			
		
		
}
}
		)
});
//Create route
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	//getting data from form add to campground array
	//redirect to campground
	var name = req.body.name;
	var img = req.body.img;
	var des = req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCamp= {name : name,image: img,description:des,author:author};
	Campground.create(newCamp,function(err,newlyCreated){
		if(err){console.log(err);}
		else{
			req.flash("suc","Sucessfully added playground")
			res.redirect("/campgrounds");}
	})

});
//New route
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){

	res.render("campgrounds/new");

});
//Show page(More information about this item)
router.get("/campgrounds/:id",middleware.isLoggedIn,function(req,res){
	//res.send("This page will be created in the future");
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround){
		if(err){console.log(err)}
		else{
			console.log(foundCampGround);
			res.render("campgrounds/show",{campground:foundCampGround});
		}
	});

});
//Edit Camp Route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	//if user logged in
	
		Campground.findById(req.params.id,function(err,foundCampground){
		
				res.render('campgrounds/edit',{campground:foundCampground});
		
	
		});


	});
//Update Route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		}
		else{
			req.flash("suc","Successfully updated playground");
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});
//Destroy Route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findByIdAndRemove(req.params.id,function(err)
	{
		if(err){
			res.redirect("/campgrounds/:id");
		}
		else{
			req.flash("suc","Successfully deleted playground");
			res.redirect("/campgrounds");
		}
	})
});


module.exports=router;