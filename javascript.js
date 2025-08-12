
// Quantum Cosmos Game - Multiplayer with Navigation, Setup, Rewards, Probabilistic Elements, Interactive UI
// Connects to socket server for multiplayer

let socket = io('http://localhost:3000'); // Change to online server URL
let gameState = { /* Your existing state */ };
let playerNumber = -1, team = -1, mode = 'Single Player', roomCode = '';

// ... (Your existing card definitions, quantumDie, functions like rollQuantumDie, getAdjacent, dfsGroupSize, etc.)

// Probabilistic deck (weighted draws)
function drawCards(num) {
  for (let i = 0; i < num && gameState.deck.length > 0; i++) {
    // Weighted: 60% common (Quark/Planet), 30% uncommon (Star/Nebula), 10% rare (Black Hole)
    const rand = Math.random();
    let cardPool = rand < 0.6 ? commonCards : rand < 0.9 ? uncommonCards : rareCards;
    gameState.hand.push(cardPool[Math.floor(Math.random() * cardPool.length)]);
  }
  // ... (existing logic)
}

// More probabilistic events (30% chance, random reward 5-15 points)
function randomEvent() {
  if (Math.random() < 0.3) {
    const variants = ['Meteor Shower' /* remove card */, 'Stellar Boost' /* +rand points */];
    const event = variants[Math.floor(Math.random() * variants.length)];
    if (event === 'Stellar Boost') {
      const bonus = Math.floor(Math.random() * 11) + 5;
      gameState.stabilityPoints += bonus;
      updateStatus(`Stellar Boost! +${bonus} Stability`);
    } // ... add Meteor logic
  }
}

// Rewarding: Team bonuses, achievements
function checkStructures() {
  // Existing + add team bonus if Constellation on team cards
  // Unlock achievement if 3 Constellations: localStorage.setItem('achievements', JSON.stringify([... , 'Cosmic Ruler']))
}

// High Scores from localStorage or server
function showHighScores() {
  let scores = JSON.parse(localStorage.getItem('highScores') || '[]');
  if (mode !== 'Single Player') socket.emit('getHighScores', mode); // Server sends
  alert('High Scores:\n' + scores.map(s => `${s.mode}: ${s.score}`).join('\n'));
}

socket.on('highScores', (scores) => {
  // Update UI with multiplayer scores
  alert('Multiplayer High Scores:\n' + scores.map(s => `${s.mode}: ${s.score}`).join('\n'));
});

// Navigation functions
function showModal() { document.getElementById('modal').style.display = 'block'; }
function hideModal() { document.getElementById('modal').style.display = 'none'; }
function toggleSettings() { alert('Settings: Sound on/off (placeholder)'); }

// Start game based on mode
function startGame() {
  mode = document.getElementById('mode').value;
  roomCode = document.getElementById('roomCode').value;
  hideModal();
  document.querySelectorAll('#boardCanvas, #hand, #status, #nextTurnBtn').forEach(el => el.style.display = 'block');
  if (mode === 'Single Player') {
    initGame(); // Local init
  } else {
    if (roomCode) socket.emit('joinRoom', { roomCode });
    else {
      roomCode = Math.random().toString(36).substring(7); // Random code
      socket.emit('createRoom', { mode, roomCode });
    }
    document.getElementById('chat').style.display = 'block';
    document.getElementById('chat-input').style.display = 'block';
  }
}

socket.on('joined', (data) => {
  playerNumber = data.playerNum;
  team = data.team;
  updateStatus(`Joined as Player ${playerNumber + 1} on Team ${team + 1}`);
});

socket.on('updatePlayers', (count) => {
  updateStatus(`Players joined: ${count}`);
});

socket.on('startGame', (state) => {
  gameState = state;
  initGame(); // Local render setup
  updateStatus(`Game started! Your team: ${team + 1}`);
});

socket.on('updateGame', (state) => {
  gameState = state;
  renderBoard();
  renderHand();
  updateStatus();
});

socket.on('chatMessage', (data) => {
  const chat = document.getElementById('chat');
  chat.innerHTML += `<p>Player ${data.player}: ${data.msg}</p>`;
  chat.scrollTop = chat.scrollHeight;
});

// Send chat
function sendChat() {
  const msg = document.getElementById('chat-input').value;
  socket.emit('chat', { roomCode, msg });
  document.getElementById('chat-input').value = '';
}

// Interactive UI: Drag-and-drop cards
function renderHand() {
  handDiv.innerHTML = '';
  gameState.hand.forEach((card, i) => {
    const btn = document.createElement('button');
    btn.textContent = `${card.type} (Cost: ${card.cost || 0})`;
    btn.style.backgroundColor = card.color;
    btn.draggable = true;
    btn.dataset.index = i;
    btn.title = `Effect: +${card.effect.stability || 0} Stability\nQuantum: ${card.quantum ? 'Yes' : 'No'}`; // Tooltip
    btn.ondragstart = (ev) => ev.dataTransfer.setData('text', i);
    handDiv.appendChild(btn);
  });
}

// Drop on canvas
canvas.ondrop = (ev) => {
  ev.preventDefault();
  const cardIndex = ev.dataTransfer.getData('text');
  // Calculate row/col from ev.clientX/Y as in handleBoardClick
  // Then call playCard(cardIndex, row, col)
};

canvas.ondragover = (ev) => ev.preventDefault();

// ... (Rest of your code: initGame, playCard with socket.emit if multiplayer, renderBoard with team scores in status, etc.)

// End game: socket.emit('endGame', { roomCode }) if multiplayer, save local high score if single

initGame(); // Initial menu load
