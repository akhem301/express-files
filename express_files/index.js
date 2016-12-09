var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//To parse json data
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var multer = require('multer');
var upload = multer();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/first_template', function(req, res){
    res.render('first_view');
});

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
        name: "TutorialsPoint",
        url:"http://www.tutorialspoint.com"
    });
});

app.get('/loginup', function(req,res){
    res.render('login',{user:
        {name: "akhem301", age:19}
    });
});

app.get('/components', function(req, res){
    res.render('content');
});

app.use(express.static('public'));
app.use(upload.array()); // for parsing multipart/form-data

app.get('/static_file_test',function(req,res){
    res.render('static_file_test');
});

app.get('/form', function(req,res){
    res.render('form');
})

//-------------------------------forms------------------------------
app.post('/', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});
//-------------------------------cookies-------------------------------------

app.get('/cookie', function(req, res){
    res.cookie('name', 'express').send('cookie set'); //Sets name=express
});

//----------------session---------------------------------------------
var session= require('express-session');

app.use(session({secret: "Shh, its a secret!"}));

app.get('/time', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   }else{
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
//----------end-----------------------------------

//-----------------authentication------------------------------
var Users = [];

app.get('/signup', function(req, res){
    res.render('signup');
});

app.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
    }
    else{
        Users.filter(function(user){
            if(user.id === req.body.id){
                res.render('signup', {message: "User Already Exists! Login or choose another user id"});
            }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

//-------------------checking login------------------------------------
function checkSignIn(req, res ){
    if(req.session.user){
        next();     //If session exists, proceed to page
    }
    else {
        var err = new Error("Not logged in!");
    console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}

app.get('/protected_page', checkSignIn, function(req, res){
    res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res){
    console.log(Users);
    if(!req.body.id || !req.body.password){
        res.render('login', {message: "Please enter both id and password"});
    }
    else{
        Users.filter(function(user){
            if(user.id === req.body.id && user.password === req.body.password){
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {message: "Invalid credentials!"});
    }
});

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('/login');
});
//////----------------------------------end---------------------------


app.listen(3000);
