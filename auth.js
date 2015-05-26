var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://mongoclient:mongoclient123@ds041861.mongolab.com:41861/app';



exports.localAuth =  function(username, password, done) {
  console.log('username:' + username);
  console.log('password:' + password);

  MongoClient.connect(url,function(err,db){
    if(err){throw err};
    db.collection('account').findOne({username:username},function(err,doc){
        if (err) {console.log(err);throw err};
        if (doc.password == password){ return done(null,doc.username)}
        return done(null,false);
    })

  })

  /*for(i=0;i<users.length;i++){
    if (username == users[i].username){
      if(password == users[i].password){
        return done(null,username);
      }
      users[i].isAuthenticated = false;
      return done(null,false,{message:'Invalid password'});
    }
  }
  return done(null,false,{message:'Invalid user'});*/
}




var users = [ {username:"a@a.com",password:"manikanth"},
              {username:"b@b.com",password:"mithra"}
            ];