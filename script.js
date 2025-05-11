const carOne = document.getElementById('car-1');
const carTwo = document.getElementById('car-2');
const wordViwe = document.getElementById('word-to-type');
const typeInput = document.getElementById('typed-id');
const startButton = document.getElementById('start-game');
const modal = document.getElementById('modal');
const resultText = document.getElementById('result-text');

let carOnePosition = 0;
let carTwoPosition = 0;
let isGameOver = false;
let currentWord = "";

const words = [
   "speed", "race", "driver", "engine", "finish",
  "turbo", "gear", "track", "lap", "brake",
  "drift", "wheel", "pitstop", "nitro", "helmet",
  "tire", "racer", "fuel", "pedal", "dash"
];

const showResult = (text) => {
  resultText.innerText = text;
  modal.showModal();
};

const getNewWord = () => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordViwe.innerText = currentWord;
};

const typeHandler = (e) => {
  if (isGameOver) return;

  if (e.target.value.trim() === currentWord) {
    typeInput.value = '';
    carOnePosition += 6;
    carOne.style.left = carOnePosition + '%';

    if (carOnePosition >= 74) {
      isGameOver = true;
      showResult("🏁 You Win!");
      return;
    }

    getNewWord();
  }
};

const carTwoConstantMovement = () => {
  const carTwoMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carTwoMove);
      return;
    }

    carTwoPosition += 4;
    carTwo.style.left = carTwoPosition + '%';

    if (carTwoPosition >= 74) {
      isGameOver = true;
      showResult("💀 You Lost!");
      clearInterval(carTwoMove);
    }
  }, 1000);
};

const startGame = () => {
  startButton.disabled = true;
  getNewWord();
  typeInput.focus();
  typeInput.addEventListener('input', typeHandler);
  carTwoConstantMovement();
};

startButton.addEventListener('click', startGame);


