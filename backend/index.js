const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Colors = require("./clients/colors");
let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.end('Merhaba Socket.IO');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  Colors.list((data) => {
    console.log("data from redis", data);
    socket.emit("color-received", data);
  });

  socket.on("new-color", (color) => {
    console.log(color);

    Colors.upsert(color);
    
    socket.broadcast.emit("receive-color", color);
  });

  socket.on('disconnect', () => console.log("a user disconnected"))
});


// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       "https://real-time-color-default-rtdb.firebaseio.com/"
//     );
//     socket.emit("FromAPI", color);
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

http.listen(port, () => {
  console.log('listening on *:3000');
});