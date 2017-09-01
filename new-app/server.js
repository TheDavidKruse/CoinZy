var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');
var app = express();
var socket = require('socket.io');
const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(8080);

io.on('connection', function(socket) {
  console.log('connected')
  socket.on('chat message', function(message) {
    console.log('message heard',message)
    socket.broadcast.emit('chat message', message)
  })
})


var index = require('./routes/indexRoutes');
var todos = require('./routes/todosRoutes');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', index);
app.use('/todos', todos);
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8100"); //The ionic server
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.listen(port, function() {
console.log("listening on port: ", port);
})

//hidden-lg-up
