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
  var token=jwt.sign({_id:user._id.toHexString(),access}, process.env.JWT_SECRET);
  user.tokens=user.tokens.concat({access,token});
  return user.save().then((user)=>{
     return token;
  });
}

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

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
