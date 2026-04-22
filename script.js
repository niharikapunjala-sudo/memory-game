// Card Data
const emojis = ['🐶','🐶','🐱','🐱','🐰','🐰','🐧','🐧'];

// Variables
let first = null;
let second = null;
let lock = false;
let moves = 0;
let matched = 0;
let time = 0;
let timer;

// Shuffle Function
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Timer
function startTimer() {
  timer = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
  }, 1000);
}

// Create Game
function createGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  let shuffled = shuffle([...emojis]);

  shuffled.forEach((emoji) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    card.onclick = () => {

      if (lock || card.textContent) return;

      card.textContent = emoji;

      if (!first) {
        first = card;
      } else {
        second = card;
        lock = true;
        moves++;
        document.getElementById("moves").textContent = moves;

        // Matching Logic
        if (first.dataset.value === second.dataset.value) {
          matched++;
          first = null;
          second = null;
          lock = false;

          // Win Condition
          if (matched === emojis.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert("🎉 You Won! 💖"), 300);
          }

        } else {
          setTimeout(() => {
            first.textContent = "";
            second.textContent = "";
            first = null;
            second = null;
            lock = false;
          }, 800);
        }
      }
    };

    game.appendChild(card);
  });
}

// Restart Game
function restartGame() {
  first = null;
  second = null;
  lock = false;
  moves = 0;
  matched = 0;
  time = 0;

  clearInterval(timer);

  document.getElementById("moves").textContent = 0;
  document.getElementById("time").textContent = 0;

  createGame();
  startTimer();
}

// Start Game
createGame();
startTimer();