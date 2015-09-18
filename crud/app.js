
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/main');
var sio = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.post('/tweet', routes.tweet);
app.post('/delete', routes.delete);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


var io = sio.listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('message', function(data) {
    console.log('message from anyone: ' + data.value);
    io.sockets.emit('message', {value: 'message from anyone: ' + data.value})
  });
});