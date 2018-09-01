var mongoose = require('mongoose');
var validator=require("validator");
const _=require("lodash");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs");

var UserSchema=new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique:true,
    validate:{
      validator: validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type: String,
      required:true
    },
    token:{
      type: String,
      required:true
    }
  }]
},{
  usePushEach: true
}
);

UserSchema.methods.toJSON=function(){
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['_id', 'email']);
}
UserSchema.methods.generateAuthToken=function(){
  var user=this;
  var access="auth";
  var token=jwt.sign({_id:user._id.toHexString(),access}, 'abc123');
  user.tokens=user.tokens.concat({access,token});
  return user.save().then((user)=>{
     return token;
  });
}

UserSchema.pre('save',function(next){
 var user=this;
 if(user.isModified("password")){
  bcrypt.genSalt(10).then((salt)=>{
    return bcrypt.hash(user.password,salt);
}).then((hashedPassword)=>{
   user.password=hashedPassword;
   next();
}).catch((err)=>{
    console.log(`error occured: ${err}`)
});
 }
 else{
  next();
 }
 

});

var User = mongoose.model('User', UserSchema);


module.exports = {User}
