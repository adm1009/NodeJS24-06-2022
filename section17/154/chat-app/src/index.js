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
io.on("connection",()=>{
    console.log("new websocket connection created");
})

server.listen(port,()=>{
    console.log("see in the port 3000");
})