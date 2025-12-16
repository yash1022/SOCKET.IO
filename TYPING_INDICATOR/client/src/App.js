import socket from './socket';
import { useEffect, useState , useRef} from 'react';



function App() {

  const [isTyping, setIsTyping] = useState(false);
   const typingTimeoutRef = useRef(null);


  useEffect(()=>{
    socket.on('typing',()=>{
      setIsTyping(true);
    }
    );

    socket.on('stopTyping',()=>{
      setIsTyping(false);
    });

     return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  },[])

  const handleTyping = ()=>{
    socket.emit('typing');

     if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }


    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping');
    }, 2000);
  }
 
  return (
     <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <div style={{ width: 300 }}>
        <input
          type="text"
          placeholder="Type something..."
          onChange={handleTyping}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16
          }}
        />

        <div style={{ marginTop: 10, height: 20 }}>
          {isTyping && (
            <em>Someone is typing...</em>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
