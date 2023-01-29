const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const routes  = require('./routes/routes')
const bodyParser = require('body-parser');
 
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config');

initializePassport(passport);
const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
     next();
}
 
const app = express();

app.set('view-engine','ejs');
 
app.use(session({
    secret: "here goes secrete string",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',routes);



app.use(passport.initialize());
app.use(passport.session());
app.get('/', checkAuthenticated,(req, res)=>{
    res.render('index.ejs');
});

  

const start = async( ) => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(6011,()=>{console.log("Server is running")});
    } catch (error) {
        console.log(error);
    }
}

start();


module.exports = {app, checkAuthenticated, checkNotAuthenticated};