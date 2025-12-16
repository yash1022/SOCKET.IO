import { useEffect, useState } from "react";
import socket from "./socket";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("userCount", (value) => {
      setCount(value);
    });

    return () => {
      socket.off("userCount");
    };
  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      fontFamily: "sans-serif"
    }}>
      Online Users: {count}
    </div>
  );
}

export default App;
