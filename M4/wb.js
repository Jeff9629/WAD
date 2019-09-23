var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

var textColors = ['red', 'green', 'yellow', 'white', 'black', 'purple'];

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

app.set('port', process.env.PORT || 3003);

if( app.thing == null ) console.log( 'bleat!' );

app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.get('/', function(req, res) {
 res.render('home');
});

app.get('/datetime', function(req, res){
 var dateTime = date+' '+time;
 res.render('datetime', {datetime: dateTime});
});

app.get('/random', function(req, res){
 var randomColor =
 textColors[Math.floor(Math.random() * textColors.length)];
 res.render('random', {random: randomColor});
});

app.get('/about', function(req, res) {
 res.render('about', {
 fortune: fortune.getFortune(),
 pageTestScript: '/qa/tests-about.js'
 } );
});

app.get('/tours/hood-river', function(req, res){
 res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
