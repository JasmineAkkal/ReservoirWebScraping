const rp = require('request-promise');
const cheerio = require('cheerio');
var mysql = require('mysql');
const rowData = [];
const secondColumn = [];
const thirdColumn = [];
const fourthColumn = [];
var path = require('path');
var http = require('http');  
var url = require('url');  
var fs = require('fs');
var express = require('express')
var app = express();
var session = require('express-session');
app.use(express.static(__dirname+"/scripts"));
app.use(session({ secret: 'ok', resave:false, saveUninitialized:true}));
app.get("/",function(request,response){
	response.sendFile(path.join(__dirname+"/scripts/reservoir.html"));
	console.log("enter");
})
console.log('world');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
console.log('world2');

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scrapingDb"
});*/
// connect to database
//con.connect();
 
// default route
app.get('/', function (req, res) {
	console.log('world3');
    return res.send({ error: true, message: 'hello' })
});
app.post('/waterData', function(req, res) {
	console.log('world2');
const options = {
	method: 'POST',
    uri: `https://cdec.water.ca.gov/cgi-progs/getAll?sens_num=15`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
  .then(($) => {
    
    var tableNDA= $('tbody');
    $('table td:nth-child(5) a').each(function(){
        secondColumn.push($(this).html());
        // console.log($(this).html());
		 //res.json($(this).text());
    })
	
 

  })
  //rp(options)
	
 
 .catch((err) => {
    console.log(err);
  });
   
  //const postBody = res.body;
  //console.log(secondColumn);
 
//myfunc();
		return res.redirect('/reservoir.html');
	
});

app.listen(8000);