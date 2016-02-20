var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);




app.post('/', function(req,res){
  var bodyParams = [];
  for (var p in req.body){
    bodyParams.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.dataList = bodyParams;
  
  var urlParams = [];
  for (var p in req.query){
    urlParams.push({'name':p,'value':req.query[p]})
  }
  context.dataList2 = urlParams;
  
  
  res.render('request2', context);
});




function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}
function genNumber(){
	var rdmNumber = {};
	rdmNumber.data = Math.random();
	return rdmNumber;
}


app.get('/',function(req,res){
  var urlParams = [];
  for (var p in req.query){
    urlParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = urlParams;
  res.render('request', context);
});

/*
app.get('/math',function(req,res){
  res.render('math', genNumber());
});

app.get('/time',function(req,res){
  res.render('time', genContext());
});

app.get('/',function(req,res){
  res.render(home)
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});
*/
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});