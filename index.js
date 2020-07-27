var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

server.listen(3000);

app.get('/',function (request,response) {
    response.sendFile(__dirname+ '/index.html')
})

users =[]
connections = []

io.sockets.on('connection',function (socket) {
    console.log('sign in success')
    connections.push(socket) //sign up

    socket.on('disconnect',function (data) {
        connections.splice(connections.indexOf(socket),1) //delete user
        console.log('deleted success')
    })
    socket.on('send mass',function (data) {
        io.sockets.emit('add',{mess:data.mess,name:data.name,className:data.className})
    })
})