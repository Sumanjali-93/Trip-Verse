const Listing=require("../models/listing");
module.exports.index = async (req, res) => {
   let { search } = req.query;

   let query={};

  if (search && search.trim() !== "") {
    const pattern=new RegExp(search.trim(), "i");
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ],
    };
  }

  const allListings = await Listing.find(query);
 

   res.render("listings/index", { allListings});
};


module.exports.renderNewForm=(req,res)=>{
  
    res.render("listings/new.ejs");
};
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    }}).populate("owner");
    if(!listing){
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;


    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};

    await newListing.save();
   
    res.redirect("/listings");
};

module.exports.editForm=async(req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id);
     if(!listing){
        res.redirect("/listings");
     }
     res.render("listings/edit.ejs",{listing});
};
module.exports.updateListing=async(req,res)=>{
     let {id}=req.params;
    
     let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
     if(typeof req.file != "undefined"){
         let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
         await listing.save();

     }
     

      res.redirect(`/listings/${id}`);
};
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
};