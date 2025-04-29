document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  startGame();
});

let timerInterval;
function startGame() {
  let time = 120;
  const timer = document.getElementById('timer');
  timerInterval = setInterval(() => {
    time--;
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    timer.textContent = `${min}:${sec}`;
    if (time <= 0) {
      clearInterval(timerInterval);
      showWinScreen();
    }
  }, 1000);

  loadPuzzlePieces();
}

function loadPuzzlePieces() {
  const pieces = document.getElementById('pieces');
  const box = document.getElementById('puzzleBox');
  pieces.innerHTML = '';
  box.innerHTML = '';

  const positions = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ];

  const shuffled = [...positions].map((pos, i) => ({ pos, index: i }))
                                 .sort(() => 0.5 - Math.random());

  shuffled.forEach(({ pos, index }) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.index = index;
    piece.style.backgroundPosition = `-${pos[1] * 100}px -${pos[0] * 100}px`;
    piece.draggable = true;

    piece.addEventListener('dragstart', dragStart);
    pieces.appendChild(piece);
  });

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.dataset.slot = i;

    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
    box.appendChild(slot);
  }
}

let dragged;

function dragStart(e) {
  dragged = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('puzzle-slot') && e.target.children.length === 0) {
    e.target.appendChild(dragged);
    checkWin();
  }
}

function checkWin() {
  const slots = document.querySelectorAll('.puzzle-slot');
  for (let i = 0; i < slots.length; i++) {
    const piece = slots[i].firstChild;
    if (!piece || piece.dataset.index != i) return;
  }
  clearInterval(timerInterval);
  setTimeout(showWinScreen, 300);
}

function showWinScreen() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('winScreen').style.display = 'flex';
}
