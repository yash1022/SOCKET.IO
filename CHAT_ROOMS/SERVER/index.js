import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    console.log("A USER IS CONNECTED");

    socket.on('joinRoom',(room)=>{
        if(socket.data?.room){
            socket.leave(socket.data.room);
            console.log(`User left room: ${socket.data.room} ${socket.id}`);
        }
        socket.join(room);
        socket.data = { ...(socket.data || {}), room };
        console.log(`User joined room: ${room} ${socket.id}`);
    })

    socket.on('sendMessage',({room,data})=>{
        const text = data?.trim();
        if(!room || !text) return;
        io.to(room).emit('message',{room,message:text});
    })


    socket.on('disconnect',()=>{
        console.log("A USER IS DISCONNECTED");
    })

    
})
server.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
});