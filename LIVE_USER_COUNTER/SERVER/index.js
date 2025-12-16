import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
    }
})

let usercount = 0;

io.on('connection',(socket)=>{

    console.log("A USER IS CONNECTED");
    usercount++;

    io.emit('userCount',usercount); 

    socket.on('disconnect',()=>{
        console.log("A USER IS DISCONNECTED");
        usercount--;
        io.emit('userCount',usercount);
    })

})

server.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
});

