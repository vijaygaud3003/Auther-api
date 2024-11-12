const express=require("express");
const port =8080;
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const User=require("./models/user.js")
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
main().then(()=>{
    console.log("connected sucessfully");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/autherapp');
};
app.listen(port,(req,res)=>{
    console.log(`app listing on port ${port}`);
});
app.post("/home",  async (req,res)=>{
    let {email,password}=req.body;
    const user=  await User.findOne({email})
    if(email==user.email&&password==user.password){
        res.render("home.ejs");
    }
    else if(email!=user.email||password!=user.password){
        res.redirect("/login"); 
    }
   
   
    
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.post("/signup",(req,res)=>{
    let {name,email,password}=req.body;
    const user=new User({
        name:name,
        email:email,
        password:password,
    });
    user.save();
    console.log(name,email,password);
    console.log("data was saved");
    res.send("data saved");
})
app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
})