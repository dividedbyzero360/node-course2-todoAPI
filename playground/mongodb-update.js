const {MongoClient, ObjectID}= require("mongodb");

var objectID=new ObjectID();
console.log(objectID);

MongoClient.connect("mongodb://localhost:27017/TODOApp",(err,db)=>{
    if(err){
        return console.log("Error connecting to the database");
    }
    console.log("Successfully connected");
   //findOneAndUpdate

//    db.collection("Todos").findOneAndUpdate({_id: new ObjectID("5b8352543491394854897f35")},{
//     $set:{
//         completed:true
//     }
//    },{
//     returnOriginal:false
//    }).then((result)=>{
//        console.log(result);
//    });

   db.collection("Users").findOneAndUpdate({_id: new ObjectID("5b83556d0fabb84a7087cef1")},{
       $set:{
           name:"Racktim"
       },
    $inc:{
        age:1
    }
   },{
    returnOriginal:false
   }).then((result)=>{
       console.log(result);
   })
});