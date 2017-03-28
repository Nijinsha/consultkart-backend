var express = require('express');
var app = express();
var bodyParser      = require('body-parser');
var user            = require('./models/user');
var passport        = require('passport');
var localStrategy   = require('passport-local');


app.set('view engine','ejs'); // setting view template as embedded java script


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/consult');


app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret : "Secret word goes here in production",
    resave :false,
    saveUninitialized :false}));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(user.authenticate()));
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());   


/***************************************************************************/
/*                                Routes                                   */
/***************************************************************************/

app.get('/',(req,res)=>{
    res.send("home page");
});

app.post('/login',passport.authenticate('local',{
    successRedirect : '/admin',
    failureRedirect : '/login'
}),function(req,res){
    
});


app.post('/clregister',function(req,res){
    //add if client save to db 
      user.register(new user({username : req.body.username}),
                             req.body.password,
                             function(err,user){
                                 if(err){
                                     //errror handling
                                 }
                                 passport.authenticate("local")(req,res,function(){
                                                    res.redirect('/dashboard');
                                 });
                             }); 
    
});
app.post('/coregister',function(req,res){
    //add if consultant save to db 
      user.register(new user({username : req.body.username}),
                             req.body.password,
                             function(err,user){
                                 if(err){
                                     //errror handling
                                 }
                                 passport.authenticate("local")(req,res,function(){
                                                    res.redirect('/dashboard');
                                 });
                             }); 
    
});


app.get("/client",isLoggedIn,(req,res)=>{
    res.render('con');
});

app.get("/consultant",(req,res)=>{
    res.send('consultant');
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}












app.listen(3000,()=>{
    console.log("server running at port 3000");
})