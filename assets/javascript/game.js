var gameStatus = false;
var endCondition = false;
var guessesRemaining;

const constants = {
  newGame: 'Press The Space Bar To Start A New Game',
  inProgress: 'Press Any Letter To Continue',
  win: 'Congratulations! You Won!  Press The Space Bar To Start A New Game',
  loss: 'Sorry, You Are Out Of Guesses.  Press The Space Bar To Start A New Game'
}

var game = {
  inProgress: false,
  currentWord: '',
  lettersGuessed: [],
  remainingGuesses: 0,
  statusText: constants.newGame
}

var wordsList = ['Illinois', 'Indiana', 'Ohio State', 'Iowa', 'Northwestern', 'Minnesota', 'Michigan', 'Michigan State', 'Penn State', 'Maryland', 'Rutgers', 'Wisconsin', 'Purdue', 'Nebraska'];

var gameStatusElement = document.getElementById('gameStatus');
var currentWordElement = document.getElementById('currentWord');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var numGuessesRemainingElement = document.getElementById('numGuessesRemaining');

function updateGame(keyPressedCode = null) {
  // update guess history array
  updateLettersGuessed(keyPressedCode);

  // check for end condition

  // update game display
  gameStatusElement.textContent = game.statusText;

  var currentWordListElement = document.getElementById('currentWordList');
  if (currentWordListElement === null) {
    currentWordListElement = document.createElement('ul');
    currentWordListElement.setAttribute('id', 'currentWordList');
    currentWordListElement.setAttribute('class', 'currentWord');

    currentWordElement.appendChild(currentWordListElement);
  }

  currentWordListElement.innerHTML = '';
  for (var char of game.currentWord) {
    var charCode = char.charCodeAt(0);
    var currentWordLetter = document.createElement('li');
    currentWordLetter.setAttribute('class', 'mx-2');
    currentWordLetter.setAttribute('id', charCode);
    
    if (game.lettersGuessed.indexOf(charCode) >= 0) {
      currentWordLetter.textContent = String.fromCharCode(charCode);
    } else if (char.charCodeAt(0) === 32) {
      currentWordLetter.textContent = ' ';
    } else {
      currentWordLetter.textContent = '_';
    }
    
    currentWordListElement.appendChild(currentWordLetter);
  }

  numGuessesRemainingElement.textContent = game.remainingGuesses;
  
  var lettersGuessedListElement = document.getElementById('lettersGuessedList');
  if (lettersGuessedListElement === null) {
    lettersGuessedListElement = document.createElement('ul');
    lettersGuessedListElement.setAttribute('id', 'lettersGuessedList');
    lettersGuessedListElement.setAttribute('class', 'lettersGuessedList');

    lettersGuessedElement.appendChild(lettersGuessedListElement);
  }

  lettersGuessedListElement.innerHTML = '';
  for (var i = 0; i < game.lettersGuessed.length; i++) {
    var guessedLetter = document.createElement('li');
    guessedLetter.setAttribute('class', 'mx-2');

    guessedLetter.textContent = String.fromCharCode(game.lettersGuessed[i]);

    lettersGuessedListElement.appendChild(guessedLetter);
  }
}

function updateGameVariables(keyPressedCode = null) {
  
}

function updateGuessesRemaining() {
  if (!gameStatus && game.remainingGuesses > 0) {
    game.remainingGuesses--;
  }
}

function updateLettersGuessed(keyPressedCode = null) {
  if (keyPressedCode !== null && keyPressedCode >= 65 && keyPressedCode <= 90) {
    if (game.lettersGuessed.indexOf(keyPressedCode) === -1) {
      game.lettersGuessed.push(keyPressedCode);
    }

    if (!game.currentWord.includes(String.fromCharCode(keyPressedCode))) {
      updateGuessesRemaining();
    }
  }
}

function startNewGame() {
  game.inProgress = true;
  game.lettersGuessed = [];
  game.remainingGuesses = 12;
  game.statusText = constants.inProgress;

  var randomIndex = Math.floor(Math.random() * wordsList.length);
  game.currentWord = wordsList[randomIndex].toUpperCase();
}

document.onkeyup = function(event) {
  var keyPressed = event.key;
  var keyPressedCode = event.keyCode;

  if (game.inProgress) {
    // Game already in progress

  } else {
    if (keyPressedCode === 32) {
      // Start New game
      startNewGame();
    }
  }

  updateGame(keyPressedCode);
}

updateGame();