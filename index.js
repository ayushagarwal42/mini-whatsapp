const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat")
const methodoverride=require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"));


mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
    .then(() => {
        console.log("Database Connected...");
    })
    .catch((error) => {
        console.log("Database cannot be connected: " + error);
    });


// let chat1 = new Chat({
//     from: "neha",
//     to: "ayush",
//     msg: "hello can u send me mern stack tutorials credentials",
//     created_at: new Date()
// })

// chat1.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log("1>>>>",chats);
    res.render("index.ejs", { chats });
})
//new route
app.get("/chats/new", async (req, res) => {
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    // console.log("newChat",newChat);
    newChat.save()
    .then((res)=>{
        console.log("chat was saved\n",res);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    // res.send("edit working")
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id, {msg:newmsg},{runValidators:true, new:true});
    console.log(updatedChat);
    res.redirect("/chats")
})

//destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let chatToDel=await Chat.findByIdAndDelete(id);
    console.log(chatToDel);
    res.redirect("/chats");
    // res.send("delete route working");
})

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {
    console.log("app is listening on port 8080");
})