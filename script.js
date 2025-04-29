// This will run when the "Start Game" button is clicked
document.getElementById('startBtn').addEventListener('click', startGame);

let dragged = null;
let timer = 120;
let timerInterval;

function startGame() {
  // Hide the landing screen and show the game screen
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

// Other puzzle-related functions (drag, drop, etc.) can stay as they are
