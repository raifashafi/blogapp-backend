const Express=require("express")
const Mongoose=require("mongoose")
const Cors=require("cors")
const Bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel=require("./models/users")

let app=Express()
app.use(Express.json())
app.use(Cors())
Mongoose.connect("mongodb+srv://raifashafi:raifashafi@cluster0.tznb7.mongodb.net/blogappDB?retryWrites=true&w=majority&appName=Cluster0")

//usersignin imputs are email n pass
app.post("/signIn",async(req,res)=>{
let input=req.body
let result=userModel.find({email:req.body.email}).then(
    (items)=>{
        if (items.length>0) {

            const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
            if (passwordValidator) {
                //token creation
                jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                    (error,token)=>{
                        if (error) {
                            res.json({"status":"error","errorMessage":error})
                        } else {
                            res.json({"status":"success","token":token,"userId":items[0]._id})
                        }

                    })


            } else {
                res.json({"status":"incorrect password"})
            }
        } else {
            res.json({"status":"invalid email id"})
        }
    }
).catch()


})




//usersignup
app.post("/signUp",async (req,res)=>
{
    let input=req.body
    let hashedPassword=Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword
   
   let check= userModel.find({email:req.body.email}).then(
    (items)=>{
        if (items.length>0) {
            res.json({"status":"email already existed"})
            
        } else {
            let result=new userModel(input)
    
             result.save()
            res.json({"status":"success"})
        }

    }
   ).catch(
    (error)=>{}
   )

  
})
app.listen(8081,()=>{
    console.log("server started")
})