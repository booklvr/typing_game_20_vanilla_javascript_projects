const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
// let not const because change
let time = 10;

// Init score
let score = 0;

let difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value
difficultySelect.value = difficulty;

// Focus on text input on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

// add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update the score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// update time interval
function updateTime(argument) {
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0 ) {
    clearInterval(timeInterval); // we created earlier

    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endGameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick = "location.reload()">Reload</button>
  `;

  endGameEl.style.display = 'flex';
}

addWordToDom();

// add event listeners

// typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;


  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    // clear input
    e.target.value = '';


    difficulty === 'easy' ?
      time +=5 :
    difficulty === 'medium' ?
        time += 3 :
        time += 2;

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})
