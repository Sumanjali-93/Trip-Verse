const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");

const wrapAsync=require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controller/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}


router.get("/",wrapAsync(listingController.index));

router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/:id",wrapAsync(listingController.showListing));

router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editForm));

router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


module.exports=router;