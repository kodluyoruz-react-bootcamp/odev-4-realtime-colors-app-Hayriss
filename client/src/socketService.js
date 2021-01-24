import { io } from 'socket.io-client';

let socket;

export const initSocket = () => {
    socket = io('https://real-time-app-react.herokuapp.com/', {
        transports: ['websocket']
    })
    console.log("connecting...")
    socket.on("connect", () => console.log("connected"));
}

export const disconnectSocket = () => {
	console.log("disconnecting...");
	if (socket) socket.disconnect();
};

export const emitColor = (color) => {
    if (socket) socket.emit("new-color", color);    
};

export const subscribeToColor = (cb) => {
    if(!socket) return true;

    socket.on('receive-color',(color) => {
        console.log("color received:",color);
        cb(color)
    })
}

export const subscribeInitialColor = (cb) => {
    if (!socket) return true;
  
    socket.on("color-received", (data) => {
      console.log("color received from other client", data);
      cb(data);
    });
  };