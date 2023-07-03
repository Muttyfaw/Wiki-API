
const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema)


/// Targets all articles /////
app.route("/articles")

.get(function (req, res) {
    Article.find()
        .then((foundArticles) => {
            res.send(foundArticles)
        })
        .catch((err) => {
            if (err) {
                res.send(err)
            }
        })
})

.post(function (req, res) {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save()
        .then((err) => {
            if (!err) {
                res.send("Successfully created a new article")
            }
            else{
                res.send(err)
            }
        })
})

.delete(function (req, res) {
    Article.deleteMany()
        .then((err) => {
            if (!err) {
                res.send("Successfully deleted the articles")
            } else {
                res.send(err)
            }
        })
})


///Targets specific routes
app.route("/articles/:articleTitle")

.get(function(req, res){
   Article.findOne({title: req.params.articleTitle})
   .then((foundArticle)=>{
    if (foundArticle){
        res.send(foundArticle)
    }else{
        res.send("No matching article found")
    }
   })
})

.put(function (req, res) {
   Article.updateOne({title: req.params.articleTitle},
    {title: req.body.title,
    content: req.body.content},
   )

    .then((err)=>{
        if(!err){
            res.send("Successful!")
        }
    })
})

app.listen("3000" || process.env.PORT, function(){
    console.log("Server started on port 3000")
})