
// server.js - Socket.io Server for Quantum Cosmos Multiplayer
// Run with: node server.js
// Supports rooms for games, team assignment, turn cycling, scores

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

const games = {}; // { roomCode: { state, players, teams, currentTurn, mode } }
const highScores = []; // Global high scores list (top 10 per mode)

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('createRoom', (data) => { // { mode: '2v2', roomCode }
    const { mode, roomCode } = data;
    if (games[roomCode]) return socket.emit('error', 'Room exists');
    const playerCount = parseInt(mode[0]) * 2; // e.g., 4 for 2v2
    games[roomCode] = {
      state: { board: Array(7).fill().map(() => Array(7).fill(null)), stabilityPoints: Array(2).fill(0), deck: [], hand: Array(playerCount).fill([]) }, // Team points, per-player hands
      players: [socket.id],
      teams: { 0: [socket.id], 1: [] }, // Team 0 and 1
      currentTurn: 0, // Player index
      mode,
      playerCount
    };
    socket.join(roomCode);
    socket.emit('joined', { roomCode, playerNum: 0, team: 0 });
  });

  socket.on('joinRoom', (data) => { // { roomCode }
    const { roomCode } = data;
    const game = games[roomCode];
    if (!game || game.players.length >= game.playerCount) return socket.emit('error', 'Room full or invalid');
    const playerNum = game.players.length;
    const team = playerNum < parseInt(game.mode[0]) ? 0 : 1; // First half to team 0
    game.players.push(socket.id);
    game.teams[team].push(socket.id);
    socket.join(roomCode);
    socket.emit('joined', { roomCode, playerNum, team });
    io.to(roomCode).emit('updatePlayers', game.players.length);
    if (game.players.length === game.playerCount) {
      // Init game: Shuffle deck, deal hands, etc. (add your init logic)
      io.to(roomCode).emit('startGame', game.state);
    }
  });

  socket.on('placeCard', (data) => { // { roomCode, row, col, cardIndex }
    const game = games[data.roomCode];
    if (!game || game.players[game.currentTurn] !== socket.id) return;
    // Update state.board, calculate stability for team, check structures, etc. (integrate your playCard logic server-side)
    // Example: game.state.board[data.row][data.col] = { type: 'Star' }; // Simplified
    // game.state.stabilityPoints[team] += points;
    game.currentTurn = (game.currentTurn + 1) % game.playerCount; // Cycle turns
    io.to(data.roomCode).emit('updateGame', game.state);
  });

  socket.on('chat', (data) => {
    io.to(data.roomCode).emit('chatMessage', { player: socket.id, msg: data.msg });
  });

  socket.on('endGame', (data) => {
    const game = games[data.roomCode];
    // Save high score: { mode, score: max(game.state.stabilityPoints), team: winner }
    highScores.push({ mode: game.mode, score: Math.max(...game.state.stabilityPoints) });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10); // Top 10
    io.to(data.roomCode).emit('highScores', highScores.filter(h => h.mode === game.mode));
    delete games[data.roomCode];
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    // Clean up rooms if needed
  });
});

server.listen(3000, () => console.log('Server on port 3000'));
