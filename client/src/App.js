import { useEffect, useState } from "react";
import './App.css';
import { initSocket, disconnectSocket, emitColor, subscribeToColor, subscribeInitialColor } from "./socketService";


function App() {
  const [color, setColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(color);
    emitColor(color);  //color backende iletildi
  };

  useEffect(() => {
    initSocket();

    subscribeInitialColor((data) => {
      setColor(data);
    });


    subscribeToColor((color) => {
      setColor(color);
    });


    return () => disconnectSocket();
  }, [setColor])


  return <div style={{ backgroundColor: `${color}` }} className="App">
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setColor(e.target.value)}
        type="color"
        value={color}
        name="color"
      />
      <br />
      <button >Color</button>
      <p>Your hex color code is : {color}</p>
    </form>
  </div>
}

export default App;
