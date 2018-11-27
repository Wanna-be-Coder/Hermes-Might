var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require('method-override');
var flash = require("connect-flash");
var seedDB = require("./seeds");


var campgroundRoutes=require("./routes/campgrounds");
	commentRoutes=require("./routes/comments");
	indexRoutes=require("./routes/index");

app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb://localhost/yelp_camp");
//  mongoose.connect("mongodb://samin:samin1@ds055855.mlab.com:55855/hermesmight");
app.use(express.static(__dirname+"/public"));
// seedDB(); //seed the database


//Passport Config

app.use(require("express-session")({
	secret:"Dogs are good",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.err=req.flash("err");
	res.locals.suc=req.flash("suc");
	next();
});



app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

















app.listen(3000,function(req,res){console.log("Server Up");});
