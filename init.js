const mongoose = require("mongoose");
const Chat = require("./models/chat");

mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
    .then(() => {
        console.log("Database Connected...");
    })
    .catch((error) => {
        console.log("Database cannot be connected: " + error);
    });


let allchats = [
    {
        from: "neha",
        to: "ayush",
        msg: "hello can u send me mern stack tutorials credentials",
        created_at: new Date()
    },
    {
        from: "abhi",
        to: "atul",
        msg: "hello papa how are you??",
        created_at: new Date()
    },
    {
        from: "teacher",
        to: "student",
        msg: "hello Student did you finish your homework?",
        created_at: new Date()
    },
    {
        from: "friend1",
        to: "friend2",
        msg: "hello can you be my friend",
        created_at: new Date()
    },
]
Chat.insertMany(allchats);