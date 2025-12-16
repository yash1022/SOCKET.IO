import { useState, useEffect } from "react";

import socket from "./socket";

function App() {
  const [room , setRoom ] = useState("");
  const [message , setMessage] = useState("");
  const [messages , setMessages] = useState([]);

  useEffect(()=>{
    socket.on('message',(data)=>{
      setMessages((prevMessages)=>[...prevMessages , data]);
    })

    return ()=>{
      socket.off("message");
    }
  },[])

  const joinRoom =(roomname)=>{
    setMessages([]);
    setRoom(roomname);
    socket.emit('joinRoom',roomname);
  }

  const sendMessage = ()=>{
    socket.emit('sendMessage',{room,data:message});
    setMessage("");
  }
  return (

     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Mini Room Chat</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => joinRoom("roomA")}>Room A</button>
        <button onClick={() => joinRoom("roomB")} style={{ marginLeft: 10 }}>
          Room B
        </button>
      </div>

      {room && (
        <>
          <p><strong>Current Room:</strong> {room}</p>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
          />
          <button onClick={sendMessage}>Send</button>

          <ul>
            {messages.map((m, i) => (
              <li key={i}>
                [{m.room}] {m.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
   
  );
}

export default App;
