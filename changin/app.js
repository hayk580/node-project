const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const studentsScheme = new Schema({name: String, age: Number, prof:String, graphik:String,prof:String,address:String}, {versionKey: false});
const User = mongoose.model("students",studentsScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Server...");
    });
});

app.get("/api/users", function(req, res){

    User.find({}, function(err, students){

        if(err) return console.log(err);
        res.send(students)
    });
});

app.get("/api/users/:id", function(req, res){

    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const userProf = req.body.prof;
    const userGraphik = req.body.graphik;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userAddress = req.body.address;
    const user = new User({name: userName, age: userAge, graphik:userGraphik, prof:userProf, address:userAddress });

    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});

app.delete("/api/users/:id", function(req, res){

    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userAddress = req.body.address;
    const userProf = req.body.prof;
    const userGraphik = req.body.graphik;
    const newUser = {age: userAge, name: userName, address:userAddress, graphik:userGraphik, prof:userProf};

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
});