const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.end('Merhaba Socket.IO');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("new-color", (color) => {
    console.log(color);
    
    socket.broadcast.emit("receive-color", color);
  });

  socket.on('disconnect', () => console.log("a user disconnected"))
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});