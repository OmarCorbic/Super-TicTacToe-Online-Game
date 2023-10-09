const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const SuperTTTGame = require("./classes/SuperTTTGame.js");
const BasicTTTGame = require("./classes/BasicTTTGame.js");
const { v4: uuid } = require("uuid");

const PORT = 8000;
const IP = "192.168.0.21";
const expressServer = app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}`)
);

app.use(cors({ origin: "*" }));
app.use(express.static(__dirname + "/build"));

const io = socketio(expressServer, { cors: { origin: "*" } });

const rooms = {};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(socket.id + "disconnected");
  });

  socket.on("play", (payLoad) => {
    const { roomId, posBasic, posSuper } = payLoad;
    const room = rooms[roomId];
    const game = room.game;

    if (!game) return; // game hasn't started yet
    if (!room) return; // room doesn't exist

    if (socket.id !== game.playerTurn.playerId) return; // not your turn

    if (posSuper) {
      const played = game.play(posSuper, posBasic);

      if (!played) return; // can't play that field (super)

      io.to(roomId).emit("gameUpdated", game);
      return;
    }
    const played = game.play(posBasic);
    if (!played) return; // can't play that field (basic)

    io.to(roomId).emit("gameUpdated", game);
    return;
  });

  socket.on("createRoom", (gameMode) => {
    const room = {
      mode: gameMode,
      // id: uuid(),
      id: "omar",
      clients: [],
    };

    rooms[room.id] = room;
    socket.emit("roomCreated", room.id);
  });

  socket.on("joinRoom", (roomId) => {
    if (!roomId) return;

    const room = rooms[roomId];
    const clientId = socket.id;

    if (!room) return; // room doesn't exist
    if (room.clients.length === 2) return; // room full
    const isPlayerTwo = room.clients.length === 1;

    if (isPlayerTwo) {
      room.clients.push(clientId);
      const playerOneId = room.clients[0];
      const playerTwoId = room.clients[1];
      let game = {};
      if (room.mode === "SUPER") {
        game = new SuperTTTGame(playerOneId, playerTwoId);
      } else {
        game = new BasicTTTGame(playerOneId, playerTwoId);
      }

      room.clients[0] = game.playerOne;
      room.clients[1] = game.playerTwo;

      socket.join(roomId);
      rooms[roomId].game = game;
      io.to(roomId).emit("roomJoined", room);
      return;
    }

    socket.join(roomId);
    room.clients.push(clientId);
    socket.emit("roomJoined", room);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    const room = rooms[roomId];
    room.clients = room.clients.filter((c) => c.playerId !== socket.id);
    const game = room.game;
    if (game && !game.winner) {
      game.winner = room.clients[0];
      game.gameState = "finished";
    }

    io.to(roomId).emit("gameUpdated", game);
    io.to(roomId).emit("clientsUpdated", room.clients);
  });
});

// const playerOne = uuid();
// const playerTwo = uuid();

// const superGame = new SuperTTTGame(playerOne, playerTwo);

// superGame.play({ x: 1, y: 0 }, { x: 0, y: 0 });
// console.table(superGame.board);
// console.table(superGame.board[0][1].board);
// superGame.play({ x: 0, y: 0 }, { x: 0, y: 1 });
// console.table(superGame.board);
// console.table(superGame.board[0][0].board);
