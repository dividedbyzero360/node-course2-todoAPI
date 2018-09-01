require('./config/config');

const _=require("lodash");
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID}=require("mongodb");
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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

  app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });
  
  app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

app.post("/users",(req,res)=>{
     var body = _.pick(req.body, ['email', 'password']);
     var newUser=new User(body);
     newUser.save().then(()=>{
      return  newUser.generateAuthToken();
    }).then((token)=>{
      res.header("x-auth",token ).send(newUser);  
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

var port= process.env.port;
app.listen(port,()=>{
console.log("Server started at port 3000");
});


module.exports.app=app;