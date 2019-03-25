var gameStatus = false;
var endCondition = false;
var guessesRemaining;

const constants = {
  newGame: 'Press The Space Bar To Start A New Game',
  inProgress: 'Press Any Letter To Continue',
  win: 'Congratulations! You Won!  Press The Space Bar To Start A New Game',
  loss: 'Sorry, You Are Out Of Guesses.  Press The Space Bar To Start A New Game',
  maxGuesses: 2
}

var game = {
  inProgress: false,
  currentWord: '',
  lettersGuessed: [],
  remainingGuesses: 0,
  statusText: constants.newGame,
  currentWordAscii: {},
  wins: 0,
  losses: 0,
  imgUrl: ''
}

// Initialize list of possible words
var wordsList = ['Illinois', 'Indiana', 'Ohio State', 'Iowa', 'Northwestern', 'Minnesota', 'Michigan', 'Michigan State', 'Penn State', 'Maryland', 'Rutgers', 'Wisconsin', 'Purdue', 'Nebraska'];

// Initialize applicable elements
var gameStatusElement = document.getElementById('gameStatus');
var currentWordElement = document.getElementById('currentWord');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var numGuessesRemainingElement = document.getElementById('numGuessesRemaining');
var winCountElement = document.getElementById('winCount');
var lossCountElement = document.getElementById('lossCount');
var teamLogoElement = document.getElementById('teamLogoImg');

// Updates the game variables and the UI
function updateGame(keyPressedCode = null) {
  // update guess history array
  updateLettersGuessed(keyPressedCode);

  // check for end condition
  checkForEndCondition();

  // update game display
  gameStatusElement.textContent = game.statusText;
  winCountElement.textContent = game.wins;
  lossCountElement.textContent = game.losses;

  var currentWordListElement = document.getElementById('currentWordList');
  if (currentWordListElement === null) {
    currentWordListElement = document.createElement('ul');
    currentWordListElement.setAttribute('id', 'currentWordList');
    currentWordListElement.setAttribute('class', 'currentWord p-0');

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
    lettersGuessedListElement.setAttribute('class', 'lettersGuessedList p-0');

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

function checkForEndCondition() {
  // assume game is over and user won
  var endFlag = true;
  var userWins = true;

  // if the user didn't guess all of the letters, game may not be over
  for (var charCode in game.currentWordAscii) {
    if (!game.currentWordAscii[charCode]) {
      endFlag = false;
      userWins = false;
    }
  }

  // game is over when user runs out of guesses
  if (game.remainingGuesses <= 0) {
    endFlag = true;
  }

  if (endFlag && game.inProgress) {
    game.inProgress = false;
    
    if (userWins) {
      game.statusText = constants.win;
      game.wins++;

      displayTeamLogo();
    } else {
      game.statusText = constants.loss;
      game.losses++;
    }
  }
}

function displayTeamLogo() {
  var teamLogoImgElement = document.createElement('img');
  teamLogoImgElement.setAttribute('src', game.imgUrl);

  teamLogoElement.appendChild(teamLogoImgElement);
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

      if (game.currentWordAscii[keyPressedCode] !== undefined) {
        game.currentWordAscii[keyPressedCode] = true;
      } else {
        updateGuessesRemaining();
      }
    }
  }
}

function startNewGame() {
  teamLogoElement.innerHTML = '';

  game.inProgress = true;
  game.lettersGuessed = [];
  game.remainingGuesses = constants.maxGuesses;
  game.statusText = constants.inProgress;
  game.currentWordAscii = {};

  var randomIndex = Math.floor(Math.random() * wordsList.length);
  game.currentWord = wordsList[randomIndex].toUpperCase();

  if (game.currentWord === 'NEBRASKA') {
    game.imgUrl = 'assets/images/' + game.currentWord + '.jpg';
  } else {
    game.imgUrl = 'assets/images/' + game.currentWord + '.png';
  }
  
  for (var char of game.currentWord) {
    if (char.charCodeAt(0) === 32) {
      game.currentWordAscii[char.charCodeAt(0)] = true;
    } else {
      game.currentWordAscii[char.charCodeAt(0)] = false;
    }
  }
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