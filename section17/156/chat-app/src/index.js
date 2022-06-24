const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const socketio = require("socket.io");
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname,"../public");
app.use(express.static(publicDirectoryPath));

const server = http.createServer(app);
const io = socketio(server);


// let count = 0;
// let grit="Welcome";
io.on("connection",(socket)=>{
    console.log("new websocket connection created");
    // socket.emit("countUpdated",count)
    // socket.on("increment",()=>{
    //     count++;
    //     // socket.emit("countUpdated",count)
    //     io.emit("countUpdated",count)
    // })
    // socket.emit("message",grit)
    socket.on("sendMessage",(message)=>{
        io.emit("message",message)
    })
})

server.listen(port,()=>{
    console.log("see in the port 3000");
})