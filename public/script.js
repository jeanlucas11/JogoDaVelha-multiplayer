const socket = new WebSocket(`ws://${location.host}`);
const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let symbol = null;
let yourTurn = false;

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.addEventListener("click", () => {
    if (yourTurn && cell.textContent === "") {
      socket.send(JSON.stringify({ type: "move", index: i }));
    }
  });
  board.appendChild(cell);
}

restartBtn.addEventListener("click", () => {
  socket.send(JSON.stringify({ type: "restart" }));
  restartBtn.style.display = "none";
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "init") {
    symbol = data.symbol;
    status.textContent = `Você é o ${symbol}`;
  }

  if (data.type === "update") {
    updateBoard(data.board);
    yourTurn = data.turn === symbol;
    status.textContent = yourTurn ? "Sua vez de jogar!" : "Vez do oponente...";
    restartBtn.style.display = "none";
  }

  if (data.type === "end") {
    updateBoard(data.board);
    status.textContent =
      data.winner === "draw" ? "Empate!" : `Jogador ${data.winner} venceu!`;
    yourTurn = false;
    restartBtn.style.display = "inline";
  }

  if (data.type === "restart") {
    updateBoard(data.board);
    status.textContent =
      data.turn === symbol ? "Sua vez de jogar!" : "Vez do oponente...";
    yourTurn = data.turn === symbol;
    restartBtn.style.display = "none";
  }
});

function updateBoard(boardState) {
  document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.textContent = boardState[i] || "";
  });
}
