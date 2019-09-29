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

app.set('port', process.env.PORT || 3001);

if( app.thing == null ) console.log( 'bleat!' );

app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.get('/', function(req, res) {
 res.render('home', {
   people: [
   { name: 'Business Law 1', code: 'BMGT 201 DA', des: 'An introduction to the law in general and a survey of the law as it relates to business transactions including the law of contracts, agency and employment, personal property, bailments, real property, wills, descendants estates, trusts and international law..', num: '3', ins: 'Fitzhenry, Daniel T.' },
   { name: 'Principles of Management', code: 'BMGT 208 DA', des: 'Emphasis on the major theories and functions of management. Students develop an understanding of why management is needed in all organizations and what constitutes good management..', num: '3', ins: 'Hogsgaard, Soren' },
   { name: 'Web Application Development', code: 'CMPS 361 EA', des: 'This course will provide a foundation in several facets of establishing and maintaining a website. This includes the latest advances in client side as well as server side technologies. The goal is to have students design, implement, and run advanced web applications. It will also cover in some detail the protocols required for web development. Prerequisites: CMPS 261, CMPS 262.', num: '3', ins: 'Voortman, Mark' },
   { name: 'Basic Algebra', code: 'MATH 165 DA', des: 'Basic algebra including fundamental operations on numbers and polynomials, linear equations and inequalities, the Cartesian coordinate system and graphs, and systems of two linear equations. Also factoring techniques, fractions, fractional equations and laws of integer exponents.', num: '3', ins: 'Torchia, Thomas A' },
   { name: 'Theories of Personality', code: 'PSYC 203 EA', des: 'This course will present the fundamentals of existing theories of personality with special attention given to the implications of each. In-depth study of Freud, Jung, Adler and other selected theorists.', num: '3', ins: 'Autumn Recehele' },
   ],
 });
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
