let dragged = null;
let timer = 120;
let timerInterval;

function startGame() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = `Time: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      showWinScreen();
    }
  }, 1000);
}

function allowDrop(e) {
  e.preventDefault();
}

function dragStart(e) {
  dragged = e.target;
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
  document.getElementById('win').style.display = 'flex';
}

// Setup puzzle
window.onload = () => {
  const pieces = document.getElementById('pieces');
  const puzzle = document.getElementById('puzzle');

  let order = Array.from({ length: 9 }, (_, i) => i);
  order = order.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 9; i++) {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.draggable = true;
    piece.dataset.index = order[i];
    piece.style.backgroundPosition = `-${(order[i] % 3) * 100}px -${Math.floor(order[i] / 3) * 100}px`;

    // Mouse support
    piece.addEventListener('dragstart', dragStart);

    // Touch support
    piece.addEventListener('touchstart', touchStart, false);
    piece.addEventListener('touchmove', touchMove, false);
    piece.addEventListener('touchend', touchEnd, false);

    pieces.appendChild(piece);
  }

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.addEventListener('dragover', allowDrop);
    slot.addEventListener('drop', drop);

    // Touch support
    slot.addEventListener('touchend', (e) => {
      if (dragged && slot.children.length === 0) {
        slot.appendChild(dragged);
        checkWin();
      }
    });

    puzzle.appendChild(slot);
  }
};

// Touch handling
let touchOffset = { x: 0, y: 0 };

function touchStart(e) {
  dragged = e.target;
  const rect = dragged.getBoundingClientRect();
  touchOffset.x = e.touches[0].clientX - rect.left;
  touchOffset.y = e.touches[0].clientY - rect.top;
  dragged.style.position = 'absolute';
  dragged.style.zIndex = 1000;
}

function touchMove(e) {
  if (!dragged) return;
  e.preventDefault();
  dragged.style.left = (e.touches[0].clientX - touchOffset.x) + 'px';
  dragged.style.top = (e.touches[0].clientY - touchOffset.y) + 'px';
}

function touchEnd(e) {
  dragged.style.position = '';
  dragged.style.left = '';
  dragged.style.top = '';
  dragged.style.zIndex = '';
}
