if(process.env.NODE_ENV !="production"){
    require("dotenv").config();

}

console.log(process.env.SECRET);
const express = require("express");
const app=express();
const port =8000;
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const listings=require("./routes/listing.js");
const session=require("express-session");
const MongoStore=require('connect-mongo').default;
const passport=require("passport");
const localStrategy=require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
const { isLoggedIn } = require("./middleware");


// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const dbURL=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbURL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use((req, res, next) => {
  res.locals.search = req.query.search || "";
  next();
});
const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,


})
store.on("error",()=>{
    console.log("Error in mongo session store",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,


    },
};


app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currUser=req.user;
    next();
})


app.get("/", (req, res) => {
    if (!req.user) {
        return res.render("users/login"); // user not logged in
    }
    res.redirect("/listings"); // logged in, go to home page with listings
});


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}
app.use("/listings",listings);
app.use("/",userRouter);

app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);

}));
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));


});
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("listings/error",{message});
    // res.status(statusCode).send(message);
});

app.listen(port,()=>{
    console.log("app is listening on port 8000");
})