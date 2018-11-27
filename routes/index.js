// var express = require("express")
// var router = express.Router({mergeParamas:true})
// var Campground = require("../models/campground")
// var passport = require("passport");
// var User = require("../models/user");





// //Authentication Route
// router.get("/register",function(req,res){
// 	res.render("register");
// });

// router.post("/register",function(req,res){
//     var newUser = new User({username:req.body.username});
// User.register(newUser,req.body.password,function(err,user){
// 	if(err){
// 		console.log(err);
// 		res.redirect("/register");
// 	}
// 	passport.authenticate("local")(req,res,function(){
// 		res.redirect("/camgrounds");
// 	})
// }
// );
// });

// router.get("/login",function(req,res){
// 	res.render("login");
// });

// router.post("/login",passport.authenticate("local",{successRedirect:"/campgrounds/index", failurRedirect:"/login"}),function(req,res){
// console.log("here");
// });

// router.get("/logout",function(req,res){
// 	req.logout();
// 	res.redirect("/campgrounds");
// });






// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		next();
// 	}
// 	else{
// 		res.redirect("/login");
// 	}

// }
// module.exports=router;

var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var Book = require("../models/book")
var passport = require("passport");
var middleware = require("../middleware/index.js");
var User = require("../models/user");


// show root route 
router.get("/", function(req, res) {
    res.render("landing");
})

// ===============
// auth routes
// ===============

// show register
router.get("/register", function(req, res) {
    res.render("register");
})


// handle sign up logic
router.post("/register", function(req, res) {
    User.register(new User({username : req.body.username,role:[req.body.role]}), req.body.password, function(err, user) {
       if(err){console.log(err);}
       else{
        passport.authenticate("local")(req, res, function() {
           res.redirect("/campgrounds"); 

       });}
        
    });
})

// show login form
router.get("/login", function(req, res) {
    res.render("login");
})

// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}), function(req, res) {
    
});

// add logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("suc","you are logged out");
    res.redirect("/");
});
router.get("/user/all",middleware.isLoggedIn,function(req,res){
    User.find({},function(err,allusers)
    {
        if(err){console.log(err);}
    
        else{
    
           
            
                
    
                    res.render("admin/user",{data:allusers});
                
            
            
    }
    }
            )
});

router.get("/campground/all",middleware.isLoggedIn,function(req,res){
    Campground.find({},function(err,allcampgrounds)
    {
        if(err){console.log(err);}
    
        else{
    
           
            
                
    
                    res.render("admin/view",{ grounds:allcampgrounds});
                
            
            
    }
    }
            )
    });
    //Destroy Route gor admin
router.delete("/users/:id",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id,function(err,user)
{
    if(err){
        res.redirect("back");
    }
    else{
        if(user.role=="superadmin"){
            req.flash("err","Can not delete super admin");
            res.redirect("back");

        }
        else{
            User.findByIdAndDelete(req.params.id,function(err){
                if(err){
                    res.redirect("back");
                    console.log(err)
                } 
                else{
                    req.flash("suc","Successfully deleted user");
                    res.redirect("back");
                }
            })
    
    }
}})
});

router.put("/user/:id/promote",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id,function(err,user){
		if(err){
            res.redirect('/campgrounds');
            console.log(err);
		}
		else{
            req.flash("suc","Successfully updated playground");
            user.role.push(req.body.role);
            user.save();
			res.redirect("back");
		}
	});

});

router.get("/book/:id",middleware.isLoggedIn,function(req,res){
res.render("book/view",{campground:req.params.id});
});

router.post("/book",middleware.isLoggedIn,function(req,res){
	//getting data from form add to campground array
	//redirect to campground
	var transactionid = req.body.transactionid;
	var author={
		id:req.user._id,
		username:req.user.username
    };
    var status=false;
 Campground.findById(req.body.campground,function(err,camground){
     if(err){
         console.log(err);
     }
     else{
        var newBook= {transactionid: transactionid,author:author,camground:camground,status:status};
        Book.create(newBook,function(err,newlyCreated){
            if(err){console.log(err);}
            else{
                req.flash("suc","Sucessfully sent request")
                res.redirect("/campgrounds");

     }
 });
	
	};

});
});

router.get("/booking/all",middleware.isLoggedIn,function(req,res){
    Book.find({},function(err,allbooks)
    {
        if(err){console.log(err);}
    
        else{
    
           
            
                
    
                    res.render("admin/book",{data:allbooks});
                
            
            
    }
    }
            )

       
});

router.delete("/book/:id",middleware.isLoggedIn,function(req,res){
    Book.findByIdAndRemove(req.params.id,function(err)
{
    if(err){
        res.redirect("back");
    }
    else{
        req.flash("suc","Successfully deleted playground");
        res.redirect("back");
    }
})
});

router.get("/about",function(req,res){
    res.render("about");
});

router.get("/books/:id",middleware.isLoggedIn,function(req,res){
    Book.findById(req.params.id,function(err,book){
        if(err){
            console.log(err)
        }
        else{
            if(book.status==false){
            book.status=true;
            book.save();
            req.flash("suc","Booked");
            res.redirect("back");
            }
            else{
            book.status=false;
            book.save();
            req.flash("err","Booking cancled");
            res.redirect("back");

            }
        }
    })

});




router.get("*",function(req,res){
	res.send("404 page does not exsist");
});


module.exports = router;