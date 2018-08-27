const {MongoClient, ObjectID}= require("mongodb");

var objectID=new ObjectID();
console.log(objectID);

MongoClient.connect("mongodb://localhost:27017/TODOApp",(err,db)=>{
    if(err){
        return console.log("Error connecting to the database");
    }
    console.log("Successfully connected");
   //deleteMany
   db.collection("Todos").deleteMany({text:"Eat lunch"}).then((result)=>{
    console.log(result);
 });

   //deleteOne

//    db.collection("Todos").deleteOne({text:"Eat lunch"}).then((result)=>{
//       console.log(result);
//    });
   //findOneAndDelete
//    db.collection("Todos").findOneAndDelete({text:"Eat lunch"}).then((result)=>{
//     console.log(result);
//  });
});