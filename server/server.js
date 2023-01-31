const http = require("http");
const express = require("express");

const cors = require("cors");
const port= 4500 || process.env.PORT;
const socketIO = require("socket.io");

let users=[];

const app = express();
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Yes the server is working fine!!!!!")
})

const server = http.createServer(app);

const io= socketIO(server);

io.on("connection",(socket)=>{
    console.log("new Connection");

    

    socket.on('joined',(data)=>{
        users[socket.id]=data.user;
        console.log(`${data.user} has joined`);
        socket.emit('welcome',{user:'Admin',message:`Welcome to the chat ${users[socket.id]}`})//this message will only be shown to the logged in user
        socket.broadcast.emit('userjoined',{user:'Admin',message:`${users[socket.id]} has joined the chat`})
        
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})

    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left the chat`});


    })



    
})

server.listen(port,()=>{
    console.log(`server is started on port http://localhost:${port}`);
})

