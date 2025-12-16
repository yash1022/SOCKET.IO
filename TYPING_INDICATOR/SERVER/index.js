import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log("A USER IS CONNECTED");

    socket.on('typing',()=>{
        socket.broadcast.emit('typing');
    })

    socket.on('stopTyping',()=>{
        socket.broadcast.emit('stopTyping');
    })





    socket.on('disconnect',()=>{
        console.log("A USER IS DISCONNECTED");
        socket.broadcast.emit('stopTyping');

    })



})
server.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
});