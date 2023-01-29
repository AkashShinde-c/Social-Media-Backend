const { authenticate } = require("passport");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

const LocalStrategy = require("passport-local").Strategy;

const initialize = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const user = await User.SUser.findOne(
      { username: username },
      function (err, obj) {
        console.log(obj);
        
      }
    ).clone().catch(function(err){ console.log(err)});

    if (!user) return done(null, false, { messages: "User doesn't exists" });

    try {
      if (await bcrypt.compare(password, user.password)){
        return done(null, user);
      }
      else{
        return done(null, false,{messages:"Incorect Password"});
      }
    } catch (e) {
        return done(e);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" },authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.SUser.findById(id, (err, user) => {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  });
};

module.exports = initialize;
