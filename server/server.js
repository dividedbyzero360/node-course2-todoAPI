var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}=require("mongodb");
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
        res.status(400).send(err);
    });
    // console.log( req.body);
    // console.log(typeof req.body);
    // console.log("-------------------------------------------");
});

app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        });
    }).catch((err)=>{
        res.send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });
var port= process.env.port || 3000;
app.listen(port,()=>{
console.log("Server started at port 3000");
});


module.exports.app=app;