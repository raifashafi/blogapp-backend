const Mongoose=require("mongoose")


const postSchema=Mongoose.Schema(

{
   //THE USER ID IS LINKING WITH THE USERS OBJECTID
    userId : {
        type : Mongoose.Schema.Types.ObjectId,
        ref:"users"//objt id of the bale users
    },
    Message:String,
    
    postedDate:
    {type: Date,default: Date.now}

}



)
var postModel=Mongoose.model("posts",postSchema)
module.exports=postModel