var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app=express();
app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
   
    var newTODO=new Todo({
        text:req.body.text
    });
    newTODO.save().then((doc)=>{
       res.send(doc);
    }).catch((err)=>{
        res.send(err);
    });
    console.log( req.body);
    console.log(typeof req.body);
    console.log("-------------------------------------------");
});
var port= process.env.port || 3000;
app.listen(port,()=>{
console.log("Server started at port 3000");
});