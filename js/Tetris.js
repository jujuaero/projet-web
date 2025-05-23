const grid = document.getElementById("tetris-grid");
const width = 10;
const height = 20;
const cells = [];

// Création de la grille
for (let i = 0; i < width * height; i++) {
  const cell = document.createElement("div");
  grid.appendChild(cell);
  cells.push(cell);
}

// Définition des tétriminos et leurs rotations
const tetrominoes = [
  // L
  [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ],
  // T
  [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ],
  // S
  [
    [1, 2, width, width+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2]
  ],
  // O
  [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ],
  // J
  [
    [1, width+1, width*2+1, width*2],
    [width, width+1, width+2, 2],
    [1, width+1, width*2+1, 0],
    [width, width+1, width+2, width*2+2]
  ],
  // I
  [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ],
  // Z
  [
    [0, 1, width+1, width+2],
    [2, width+1, width+2, width*2+1],
    [0, 1, width+1, width+2],
    [2, width+1, width+2, width*2+1]
  ]
];

let currentPosition = 3;
let currentRotation = 0;
let random = Math.floor(Math.random() * tetrominoes.length);
let currentTetromino = tetrominoes[random][currentRotation];

function draw() {
  currentTetromino.forEach(index => {
    cells[currentPosition + index]?.classList.add('block');
  });
}

function undraw() {
  currentTetromino.forEach(index => {
    cells[currentPosition + index]?.classList.remove('block');
  });
}

let timerId = null;
let isPaused = false;
let isGameOver = false;

function startGame() {
  if (timerId || isGameOver) return;
  draw();
  timerId = setInterval(moveDown, 600);
}

function pauseGame() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    isPaused = true;
  }
}

function resumeGame() {
  if (!timerId && isPaused && !isGameOver) {
    timerId = setInterval(moveDown, 600);
    isPaused = false;
  }
}

function resetGame() {
  if (timerId) clearInterval(timerId);
  cells.forEach(cell => cell.classList.remove('block', 'taken'));
  score = 0;
  document.getElementById("score").textContent = "Score : 0";
  currentPosition = 3;
  currentRotation = 0;
  random = Math.floor(Math.random() * tetrominoes.length);
  currentTetromino = tetrominoes[random][currentRotation];
  isGameOver = false;
  isPaused = false;
  draw();
  timerId = setInterval(moveDown, 600);
}

// Correction collision: freeze si la prochaine descente touche une case prise ou le bas
function moveDown() {
  if (isPaused || isGameOver) return;
  undraw();
  currentPosition += width;
  if (currentTetromino.some(index => {
    const pos = currentPosition + index;
    return pos >= width * height || cells[pos]?.classList.contains('taken');
  })) {
    currentPosition -= width;
    draw();
    freeze();
    return;
  }
  draw();
}

function freeze() {
  currentTetromino.forEach(index =>
    cells[currentPosition + index]?.classList.add('taken')
  );
  clearFullLines();
  // Nouveau tétrimino
  random = Math.floor(Math.random() * tetrominoes.length);
  currentRotation = 0;
  currentTetromino = tetrominoes[random][currentRotation];
  currentPosition = 3;
  if (currentTetromino.some(index => cells[currentPosition + index]?.classList.contains('taken'))) {
    alert("Game Over");
    isGameOver = true;
    if (timerId) clearInterval(timerId);
    timerId = null;
    return;
  }
  draw();
}

function moveLeft() {
  undraw();
  if (!isAtLeftEdge() && !wouldCollide(-1)) currentPosition -= 1;
  draw();
}

function moveRight() {
  undraw();
  if (!isAtRightEdge() && !wouldCollide(1)) currentPosition += 1;
  draw();
}

function rotate() {
  undraw();
  const nextRotation = (currentRotation + 1) % 4;
  const nextTetromino = tetrominoes[random][nextRotation];
  if (!wouldCollide(0, nextTetromino) && !isAtEdgeOnRotate(nextTetromino)) {
    currentRotation = nextRotation;
    currentTetromino = nextTetromino;
  }
  draw();
}

function isAtLeftEdge() {
  return currentTetromino.some(index => (currentPosition + index) % width === 0);
}
function isAtRightEdge() {
  return currentTetromino.some(index => (currentPosition + index) % width === width - 1);
}
function isAtEdgeOnRotate(nextTetromino) {
  return nextTetromino.some(index => {
    const pos = currentPosition + index;
    return pos % width === 0 || pos % width === width - 1;
  });
}

function wouldCollide(offset = 0, tetromino = currentTetromino) {
  return tetromino.some(index => {
    const pos = currentPosition + index + offset;
    return (
      pos >= width * height ||
      cells[pos]?.classList.contains('taken')
    );
  });
}

function checkCollision() {
  return currentTetromino.some(index =>
    cells[currentPosition + index + width]?.classList.contains('taken') ||
    currentPosition + index + width >= width * height
  );
}

let score = 0;

function clearFullLines() {
  for (let row = 0; row < height; row++) {
    const start = row * width;
    const rowCells = cells.slice(start, start + width);
    if (rowCells.every(cell => cell.classList.contains('taken'))) {
      rowCells.forEach(cell => {
        cell.classList.remove('taken', 'block');
      });
      // Retirer les divs du tableau et les replacer en haut
      const removed = cells.splice(start, width);
      cells.unshift(...removed);
      // Réafficher la grille
      cells.forEach(cell => grid.appendChild(cell));
      score += 100;
      if (document.getElementById("score"))
        document.getElementById("score").textContent = "Score : " + score;
    }
  }
}

// Contrôles clavier
window.addEventListener('keydown', (e) => {
  if (e.key === 's') moveLeft();
  else if (e.key === 'f') moveRight();
  else if (e.key === 'd') moveDown();
  else if (e.key === 'e') rotate();
});

// Désactive le jeu au chargement
undraw();
if (timerId) clearInterval(timerId);
timerId = null;