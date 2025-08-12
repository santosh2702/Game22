Quantum Cosmos Board Game
Quantum Cosmos is a strategic, turn-based board game where you build a universe on a 7x7 hexagonal grid using cards like Stars, Black Holes, and Nebulae. Play solo to reach 50 Stability Points or compete in multiplayer team modes (2v2, 3v3, 4v4) to outscore opponents. With probabilistic events, random rewards, and a cosmic theme, it’s a mix of strategy, luck, and visual flair.
Game Objective

Single-Player: Score 50 Stability Points before the deck runs out or avoid dropping below 0 points (loss).
Multiplayer (2v2, 3v3, 4v4): Your team (e.g., Team A) competes to have the highest combined Stability Points when the deck empties. Teams take turns placing cards on a shared board.
Fun Elements: Random events (e.g., Meteor Shower), quantum dice rolls, and achievements (e.g., “Cosmic Ruler”) make every game dynamic.

Game Rules
Setup

Board: A 7x7 hexagonal grid where cards are placed.
Deck: Contains:
Cosmic Cards: Quark (+2 Stability, Cost: 1), Star (+4, Cost: 1, Quantum), Black Hole (+6, Cost: 2, Quantum), Nebula (+3, Cost: 1, +1 per adjacent card), Planet (+1, Cost: 0).
Event Cards: Wormhole (move a card), Supernova (remove a card), Cosmic Ray (draw 2 cards).
Modifier Cards: Dark Energy (+2 Stability to a card).


Hand: Start with 5 cards (drawn with weights: 60% Quark/Planet, 30% Star/Nebula, 10% Black Hole).
Stability Points: Your score (individual in single-player, team total in multiplayer).
Modes: Single-player (local), or multiplayer (2v2, 3v3, 4v4 via Socket.io server).

Gameplay Loop

Start a Game:
Click “New Game” in the menu.
Choose mode (Single Player, 2v2, 3v3, 4v4).
For multiplayer: Enter a room code to join or create a new one. Wait for the required players (e.g., 4 for 2v2).


Your Turn:
Select a Card: Click or drag a card from your hand (bottom of screen).
Place Card: Drop on an empty hex (Cosmic/Planet cards) or target a hex (Event/Modifier cards).
Effects:
Cosmic Cards: Add Stability (e.g., Star: +4).
Nebula Bonus: +1 Stability per adjacent card.
Quantum Dice: For Star/Black Hole, roll Wave/Particle (no effect) or Void (Black Hole collapses, -3 Stability).
Events: Wormhole moves a card, Supernova removes one, Cosmic Ray draws 2.
Modifiers: Dark Energy boosts a card’s Stability by +2.


Cost: Discard cards to play (e.g., Black Hole costs 2 cards; Planet is free).
Structures: 3+ adjacent Stars form a Constellation (+5 Stability in single-player, +10 for team in multiplayer).


Random Events (30% chance per turn):
Meteor Shower: Removes a random card.
Stellar Boost: Adds 5-15 random Stability Points.


End Turn: Click “Next Turn” to draw 2 cards and pass (in multiplayer, turn cycles to next player).
Game End:
Single-Player: Win at 50 Stability, lose at <0 or deck empty (no 50).
Multiplayer: Team with highest Stability when deck empties wins.
Achievements: Unlock for milestones (e.g., 5 Nebulae = “Nebula Master”), saved in browser.



Multiplayer Details

Teams: Players split evenly (e.g., 2v2: 2 per team). Team Stability is the sum of members’ points.
Turns: Cycle through all players (e.g., Player 1 Team A, Player 1 Team B, Player 2 Team A, etc.).
Shared Board: All players place on the same 7x7 grid.
Chat: Send messages in multiplayer via the chat box.
High Scores: Top 10 scores per mode saved on server (multiplayer) or browser (single-player).

Basic Points to Start

Launch the Game:
Local: Save index.html, javascript.js, and server.js. Install Node.js, run npm init -y && npm install express socket.io, then node server.js. Open index.html in a browser.
Online: Host client on GitHub Pages/Netlify, server on Vercel/Heroku. Update socket URL in JS to your server (e.g., io('https://your-server.vercel.app')).


Navigate:
Menu: Click “New Game” to set up, “High Scores” for leaderboards, “Settings” for sound toggle (placeholder).
Setup: Choose mode; for multiplayer, create/join a room code.


Play Strategically:
Single-Player: Aim for 50 Stability. Group Stars for Constellations (+5), place Nebulae near cards, avoid Black Hole risks.
Multiplayer: Coordinate with teammates via chat to block opponents’ Constellations or use Supernova to disrupt.
Tips:
Save Cosmic Ray for low-hand situations.
Use Planets for quick, cost-free points.
Place Stars together but watch for Meteor Showers.




Watch Feedback:
Status bar shows actions (e.g., “Played Star! +4 Stability”).
Animations (fading circles) and colors (e.g., Star: yellow) highlight plays.
Tooltips on cards show effects (hover over hand).


End and Restart:
Game ends with win/loss message. Refresh browser to restart.
Check High Scores for your best runs or team rankings.



Why It’s Fun

Strategy: Choose cards and positions to maximize points (e.g., Constellations, Nebula bonuses).
Luck: Quantum dice and random events (30% chance) add excitement.
Rewards: Unlock achievements (e.g., “Cosmic Ruler” for 50 points) and earn team bonuses.
Interactivity: Drag-and-drop cards, chat with teammates, see animated plays.
Team Play: In 2v2/3v3/4v4, work together to outscore opponents.

Technical Setup

Files:
index.html: UI with menu, canvas, and chat.
QuantumCosmosGame_Multiplayer.js: Client logic, Socket.io for multiplayer.
server.js: Node.js server for rooms, turns, scores.


Run Locally:
Install Node.js.
npm install express socket.io.
node server.js (port 3000).
Open index.html in multiple tabs for multiplayer testing.


Run Online:
Host client on GitHub Pages/Netlify.
Deploy server on Vercel/Heroku; update socket URL.


Dependencies: Socket.io (CDN in HTML), Express (server).

Troubleshooting

Can’t Place Cards: Ensure you select a card (drag or click), then drop on an empty hex. Check console (F12) for errors.
Multiplayer Issues: Verify server is running, room code matches, and all players joined before start.
UI Glitches: Use Chrome, ensure 100% zoom for canvas alignment.

Future Enhancements

Add sound effects (Web Audio API).
More cards (e.g., Pulsar stealing points).
AI opponent for single-player or uneven teams.
Advanced animations (e.g., board shake on Meteor Shower).

