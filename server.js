var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendfile('index.html');
});


io.sockets.on('connection', function(socket){

  socket.on('user-login', function(loggedUser){
    socket.user = loggedUser;
  });

  socket.on('join-room', function(roomId){
    console.log('user logged in : ' + roomId);
    socket.join(roomId);
    socket.room = roomId;

  });
  socket.on('chat-message', function(msg){
    var message = {
      room: socket.room,
      username: socket.user.username,
      content: msg
    };
    io.sockets.in(socket.room).emit('chat-message', message);
    console.log('Message de : ' + message.username + ' dans ' + socket.room);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.leave(socket.room);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
