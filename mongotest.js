var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://mongoclient:mongoclient123@ds041861.mongolab.com:41861/app';



  MongoClient.connect(url,function(err,db){
    if(err){throw err};
    console.log("Got a connection");
    db.close();

  })