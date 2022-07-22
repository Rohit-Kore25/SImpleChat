//jshint esversion:8

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const {Server} = require('socket.io');



app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
});

io.on("connection",(socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message",data);
  });

  socket.on("disconnect",() => {
    console.log("A user disconnected!",socket.id);
  });
});

server.listen(5000, () => {
  console.log("The server has started!");
});
