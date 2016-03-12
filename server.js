var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "week18day3";
var collections = ["books"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});



// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});



//Save to DB
app.post('/submit', function(req, res) {
  //if we want the object to have a boolean value of false, we have to do it here, because the ajax post will convert it to a string instead of a boolean
  //this is done for you below. So save the "book" object we create to your DB
  var book = req.body;
  book.read = false;


});


//Get list of books with the field "read" marked true
app.get('/read', function(req, res) {


});

//Get list of books with the field "read" marked false
app.get('/unread', function(req, res) {


});


//Use the ID parameter to update the value of "read" to true
app.get('/markread/:id', function(req, res) {
  //Remember: when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))


});

//Use the ID parameter to update the value of "read" to false
app.get('/markunread/:id', function(req, res) {
  //Remember: when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))


});



app.listen(3000, function() {
  console.log('App running on port 3000!');
});
```

index.html:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Book Tracker</title>
  <style>
  #unread, #read{
    width:40%;
    background-color: antiquewhite;
  }
  #unread{
    float:left;
  }
  #read{
    float:right;
  }
  table, td{
    border: 1px solid black;
  }
  #wrapper{
    padding-top: 10%;
    text-align: center;
    width: 960px;
    margin: 0 auto;
  }
  body{
    background-color: #C0FFEE;
    font-family: sans-serif;
  }
  #results{
    margin-top:50px;
  }
  #userinput{
    font-size: 24px;
  }
  input {
    width:50%;
    height:36px;
    font-size: 24px;
  }
  </style>
</head>
<body>
  <div id="wrapper">
    <h1>Book Tracker 4000</h1>
    <h2><i>The latest and greatest in book tracking technology!</i></h2>
    <form id="userinput">
        <input type="text" id="title" placeholder="Book Title"/>
      <br />
        <input type="text" id="author" placeholder="Book Author"/>
      <br />
      <button type="submit" id="addbook">Add New</button>
    </form>
    <div id="results">
      <table id="unread">
            <tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>
      </table>
      <table id="read">
            <tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>
      </table>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
```


app.js:
```
//

// Click Events

//
$('#addbook').on('click', function(){
  $.ajax({
    type: "POST",
    url: '/submit',
    dataType: 'json',
    data: {
      title: $('#title').val(),
      author: $('#author').val(),
      created: Date.now()
    }
  })
  .done(function(data){
    console.log(data);
    getUnread();
    $('#author').val("");
    $('#title').val("");
  }
  );
  return false;
});


$(document).on('click', '.markread', function(){
    var thisId = $(this).attr('data-id');
    $.ajax({
      type: "GET",
      url: '/markread/' + thisId,
    });
    $(this).parents('tr').remove();
    getRead();
});




$(document).on('click', '.markunread', function(){
  var thisId = $(this).attr('data-id');
  $.ajax({
    type: "GET",
    url: '/markunread/' + thisId,
  });
  $(this).parents('tr').remove();
  getUnread();
});








// Get read and unread on screen

function getUnread(){
  $('#unread').empty();
  $.getJSON('/unread', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#unread').prepend('<tr><td>' + data[i].title + '</td>' + '<td>' + data[i].author + '</td><td><button class="markread" data-id="' +data[i]._id+ '">Mark Read</button></td></tr>');
    }
    $('#unread').prepend('<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>');
  });
}

function getRead(){
  $('#read').empty();
  $.getJSON('/read', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#read').prepend('<tr><td>' + data[i].title + '</td>' + '<td>' + data[i].author + '</td><td><button class="markunread" data-id="' +data[i]._id+ '">Mark Unread</button></td></tr>');
    }
    $('#read').prepend('<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>');
  });
}

getUnread();
getRead();