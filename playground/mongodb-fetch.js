const {MongoClient, ObjectID}= require("mongodb");

var objectID=new ObjectID();
console.log(objectID);

MongoClient.connect("mongodb://localhost:27017/TODOApp",(err,db)=>{
    if(err){
        return console.log("Error connecting to the database");
    }
    console.log("Successfully connected");
   // console.log(db.collection("Todos").find().toArray());
    //db.close();
    // db.collection("Todos").find({_id:new ObjectID("5b836ee1940556419f9ca8e5")}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,3));
    //    // console.log(docs);
    // }).catch((error)=>{
    //     console.log("Unable to fetch data", error);
    // });

    db.collection("Todos").find().count().then((count)=>{
        console.log(`TODO count: ${count}`);
    }).catch((error)=>{
        console.log("Unable to fetch data", error);
    });
});