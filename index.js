const express = require('express');

var app = new express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

var users = [];
var connections = [];

io.sockets.on('connection', function(socket) {
  console.log("Успешное соединение");
  connections.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отключился");
  });

  socket.on('send mess', function(data) {
    io.sockets.emit('add mess', {message: data.message, user:data.user, colorClass: data.colorClass});
  });
});
