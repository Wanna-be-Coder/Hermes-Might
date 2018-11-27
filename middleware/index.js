var middlewareObj ={};
var Campground = require("../models/campground");
var Comment = require("../models/comment");



middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
                req.flash("err","Playground not found");
				res.redirect('back');
			}
			else{
				if(foundCampground.author.id.equals(req.user._id) || req.user.role=="superadmin" || req.user.role=="admin" ){
				next();
			}
			else{
            req.flash("err","Permission denied");
			res.redirect("back");
			}
		}
	
		});

	}else{
		req.flash("err","Please login if you want to continue!");
		res.redirect("back");
    }
}

    
middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect('back');
            }
            else{
              if(foundComment.author.id.equals(req.user._id) || req.user.role=="superadmin" || req.user.role=="admin"){
                  next();
              }
              else{
                  res.redirect("back");
              }

            
           
        }
    
        });

    }else{
      
        res.redirect("back");
        
    }
}


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
		next();
	}
	else{
        req.flash("err","Please login if you want to continue!");
		res.redirect("/login");
	}

}

















module.exports=middlewareObj