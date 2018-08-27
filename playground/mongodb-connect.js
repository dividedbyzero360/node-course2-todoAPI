const {MongoClient, ObjectID}= require("mongodb");

var objectID=new ObjectID();
console.log(objectID);

MongoClient.connect("mongodb://localhost:27017/TODOApp",(err,db)=>{
    if(err){
        return console.log("Error connecting to the database");
    }
    console.log("Successfully connected");
    // db.collection("Todos").insertOne({
    //     text:"Something to do",
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log("unable to insert",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection("Users").insertOne({
    //     name:"Wastabir",
    //     age:false,
    //     location:"Montreal"
    // },(err,result)=>{
    //     if(err){
    //         return console.log("unable to insert",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // });
    db.close();
});