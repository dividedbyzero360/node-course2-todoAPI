const mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/TODOApp");

var TODO=mongoose.model("TODO",{
    text:{
     type: String,
     required:true,
     trim:true,
     minlength:1
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});
var User=mongoose.model("User",{
    email:{
     type: String,
     required:true,
     trim:true,
     minlength:1
    }
});

var newUser=new User({
    email:"wastabir.alam@gmail.com"
});

newUser.save().then((doc)=>{
    console.log("Saved the doc",doc);
}).catch((err)=>{
    console.log("Unable to save the doc");
});


// var newTODO=new TODO({
//     text:"Cook dinner"
// });
// newTODO.save().then((doc)=>{
//   console.log("Saved the doc",doc)
// }).catch((err)=>{
//     console.log("Unable to save the doc");
// });

// var newTODO1=new TODO({
//     text:"Cook dinner",
//     completed:false,
//     completedAt:12344
// });
// newTODO1.save().then((doc)=>{
//     console.log("Saved the doc",doc)
// }).catch((err)=>{
//     console.log("Unable to save the doc",err);
// });

// var newTODO1=new TODO({
    
//             text:"Cook dinner",
//             completed:false,
//             completedAt:12344
     
// });
// newTODO1.save().then((doc)=>{
//     console.log("Saved the doc",doc)
// }).catch((err)=>{
//     console.log("Unable to save the doc",err);
// });