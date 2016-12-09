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

//-------------------------------forms------------------------------
app.post('/', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});
//--------------------------------------------------------------------
//
// app.get('/', function(req, res){
//     res.cookie('name', 'express').send('cookie set'); //Sets name=express
// });
// var session= require('express-session');
//
// app.use(session({secret: "Shh, its a secret!"}));
//
// app.get('/', function(req, res){
//    if(req.session.page_views){
//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times");
//    }else{
//       req.session.page_views = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });


var things= require('./things.js');

app.use('/things',things);

app.listen(3000);
// app.get('/hello', function(req, res){
// 	res.send("Hello World!");
// });
//
// app.post('/hello', function(req, res){
// 	res.send("You just called the post method at '/hello'!\n");
// });
//
// app.all('/test', function(req, res){
// 	res.send("HTTP method doesn't have any effect on this route!");
// });
//
// app.listen(3000);
