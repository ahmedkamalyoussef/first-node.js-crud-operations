const express = require("express");
const mongoose =require("mongoose");
const app = express();

const Article=require("./models/Article")

app.use(express.json())



mongoose.connect("mongodb+srv://ahmedkamal:0a41468158800@firstdatabase.i4ubc.mongodb.net/?retryWrites=true&w=majority&appName=firstDatabase")
.then((()=>{
    console.log("connected succsessfully");

})).catch((err)=>{
    console.log("connection err",err);
})



app.post("/articles",async (req,res)=>{
    const newArtcle=new Article();
    newArtcle.title=req.body.title;
    newArtcle.body=req.body.body;
    newArtcle.numberOfLikes=0;
    await newArtcle.save();
    res.json(newArtcle)
})
app.get("/articles",async (req,res)=>{
    const articles=await Article.find();
    res.json(articles);
})
app.get("/articles/:id",async (req,res)=>{
    const id=req.params.id
    const article=await Article.findById(id);
    res.json(article);
})
app.delete("/articles/:id",async (req,res)=>{
    const id=req.params.id
    const article=await Article.findByIdAndDelete(id);
    res.json("done");
})
app.get("/", (req, res) => {
    res.send("hello");
});
app.get("/hi", (req, res) => {
    // res.sendFile(__dirname+"/views/hello.html");
    const name ="ahmed";
    res.render("hello.ejs",{
        name:name
    })
});




app.listen(3000, () => {
    console.log("i'm listening on port 3000");
});
