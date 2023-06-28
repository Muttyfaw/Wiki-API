
const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Articles = mongoose.model("Article", articleSchema)

const article = new Articles({
    title: "API",
    
})

app.listen("3000" || process.env.PORT, function(){
    console.log("Server started on port 3000")
})