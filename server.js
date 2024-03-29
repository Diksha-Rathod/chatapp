const http=require("http");
const express=require("express");
const path=require("path");
const app= express();
const server=http.createServer(app);
const io= require("socket.io")(server);
const port=2000;

app.use(express.static(path.join(__dirname+'/public/styles')));
io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username+" joined the conversation");
    })
    socket.on("exituser",function(username){ 
        socket.broadcast.emit("update",username+" left the conversation");
    })
    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
    })
})
server.listen(port,()=>{
    console.log("server connected ..........! ")
})