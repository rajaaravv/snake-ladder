const snakes = {99:78, 95:75, 92:88, 74:53, 47:26};
const ladders = {2:38, 7:14, 22:42, 28:84, 36:44};
const board = document.getElementById('board');
const diceResult = document.getElementById('diceResult');
const turnInfo = document.getElementById('turnInfo');

let positions = [1, 1];
let currentPlayer = 0;
let twoPlayers = true;

function createBoard() {
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.innerText = i;

    if (snakes[i]) {
      cell.style.background = '#ffcccc';
      cell.innerHTML += `<div>🐍→${snakes[i]}</div>`;
    } else if (Object.values(snakes).includes(i)) {
      cell.style.background = '#ffe6e6';
      cell.innerHTML += `<div>↑🐍</div>`;
    }

    if (ladders[i]) {
      cell.style.background = '#ccffcc';
      cell.innerHTML += `<div>🪜→${ladders[i]}</div>`;
    } else if (Object.values(ladders).includes(i)) {
      cell.style.background = '#e6ffe6';
      cell.innerHTML += `<div>↑🪜</div>`;
    }

    board.appendChild(cell);
  }
  renderPlayers();
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Player ${currentPlayer + 1} rolled a ${roll}`;

  let newPos = positions[currentPlayer] + roll;
  if (newPos <= 100) {
    if (snakes[newPos]) {
      newPos = snakes[newPos];
      turnInfo.textContent = `Oh no! Player ${currentPlayer + 1} got bitten by a 🐍!`;
    } else if (ladders[newPos]) {
      newPos = ladders[newPos];
      turnInfo.textContent = `Yay! Player ${currentPlayer + 1} climbed a 🪜!`;
    } else {
      turnInfo.textContent = `Player ${currentPlayer + 1}'s turn`;
    }
    positions[currentPlayer] = newPos;
  }

  renderPlayers();

  if (positions[currentPlayer] === 100) {
    turnInfo.textContent = `🎉 Player ${currentPlayer + 1} wins!`;
    return;
  }

  currentPlayer = twoPlayers ? 1 - currentPlayer : 0;
  turnInfo.textContent = `Player ${currentPlayer + 1}'s turn`;
}

function renderPlayers() {
  document.querySelectorAll('.player').forEach(p => p.remove());

  positions.forEach((pos, i) => {
    const token = document.createElement('div');
    token.className = `player player${i + 1}`;
    const cell = document.getElementById(`cell-${pos}`);
    cell.appendChild(token);
  });
}

createBoard();
turnInfo.textContent = `Player ${currentPlayer + 1}'s turn`;
