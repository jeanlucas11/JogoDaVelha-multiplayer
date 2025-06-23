const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const app = express();

app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let players = [];
let board = Array(9).fill(null);
let currentPlayer = 0;

wss.on("connection", (ws) => {
  if (players.length >= 2) {
    ws.close();
    return;
  }

  const symbol = players.length === 0 ? "X" : "O";
  players.push(ws);

  ws.send(JSON.stringify({ type: "init", symbol }));
  if (players.length === 2) {
    broadcast({
      type: "update",
      board,
      turn: ["X", "O"][currentPlayer],
    });
  }

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (
      data.type === "move" &&
      players[currentPlayer] === ws &&
      !board[data.index]
    ) {
      board[data.index] = ["X", "O"][currentPlayer];

      const winner = checkWinner(board);
      if (winner || !board.includes(null)) {
        broadcast({
          type: "end",
          board,
          winner: winner || "draw",
        });
        return;
      }

      currentPlayer = 1 - currentPlayer;
      broadcast({
        type: "update",
        board,
        turn: ["X", "O"][currentPlayer],
      });
    }

    if (data.type === "restart") {
      board = Array(9).fill(null);
      currentPlayer = 0;
      broadcast({
        type: "restart",
        board,
        turn: ["X", "O"][currentPlayer],
      });
    }
  });

  ws.on("close", () => {
    players = [];
    board = Array(9).fill(null);
    currentPlayer = 0;
  });
});

function broadcast(data) {
  players.forEach(
    (p) => p.readyState === WebSocket.OPEN && p.send(JSON.stringify(data))
  );
}

function checkWinner(b) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
