mongoose = require('mongoose');


//mongoDB
  function start(){
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
      name:String,
      point:Number,
      img:String,
      created:{type:Date,default:Date.now}
    });
  
  mongoose.model("User",UserSchema);
  mongoose.connect("mongodb://localhost/test");

  var User = mongoose.model("User");
  var user = new User();
  var player = new User();
  user.name = "okazaki";
  user.point = 777;
  player.name = "miyioko";
  player.point = "345";

  player.save(function(err){
    if(err){console.log(err)}
  });
  user.save(function(err){
    if(err){console.log(err)}
  });

  console.log(player);
}
  

exports.start = start;