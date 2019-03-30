// initialize game constants
const CONSTANTS = {
  NEW_GAME: 'Press The Space Bar To Start A New Game',
  IN_PROGRESS: 'Press Any Letter To Continue',
  WIN: 'Congratulations! You Won!  Press The Space Bar To Start A New Game',
  LOSS: 'Sorry, You Are Out Of Guesses.  Press The Space Bar To Start A New Game',
  MAX_GUESSES: 2
}

// Initialize list of possible words
var wordsList = ['Illinois', 'Indiana', 'Ohio State', 'Iowa', 'Northwestern', 'Minnesota', 'Michigan', 'Michigan State', 'Penn State', 'Maryland', 'Rutgers', 'Wisconsin', 'Purdue', 'Nebraska'];

// Initialize DOM element variables
var gameStatusElement = document.getElementById('gameStatus');
var currentWordElement = document.getElementById('currentWord');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var numGuessesRemainingElement = document.getElementById('numGuessesRemaining');
var winCountElement = document.getElementById('winCount');
var lossCountElement = document.getElementById('lossCount');
var teamLogoElement = document.getElementById('teamLogoImg');

// initialize game object
var game = {
  inProgress: false,
  currentWord: '',
  lettersGuessed: [],
  remainingGuesses: 0,
  statusText: CONSTANTS.NEW_GAME,
  currentWordAscii: {},
  wins: 0,
  losses: 0,
  imgUrl: '',

  // reset the game object to its initial state
  startNewGame: function() {
    teamLogoElement.innerHTML = '';

    this.inProgress = true;
    this.lettersGuessed = [];
    this.remainingGuesses = CONSTANTS.MAX_GUESSES;
    this.statusText = CONSTANTS.IN_PROGRESS;
    this.currentWordAscii = {};

    var randomIndex = Math.floor(Math.random() * wordsList.length);
    this.currentWord = wordsList[randomIndex].toUpperCase();

    this.imgUrl = 'assets/images/' + game.currentWord + '.png';
    
    // set each unique char code of the chosen word to false (except spaces)
    for (var char of game.currentWord) {
      if (char.charCodeAt(0) === 32) {
        this.currentWordAscii[char.charCodeAt(0)] = true;
      } else {
        this.currentWordAscii[char.charCodeAt(0)] = false;
      }
    }
  },

  // update the letters guessed array if the user entered a valid character
  updateLettersGuessed: function(keyPressedCode = null) {
    // check for valid input - any letter: a-z
    if (keyPressedCode !== null && keyPressedCode >= 65 && keyPressedCode <= 90) {
      // check if user has already guessed the letter
      if (this.lettersGuessed.indexOf(keyPressedCode) === -1) {
        // append this user guess to the guess history array
        this.lettersGuessed.push(keyPressedCode);

        // if user guess is part of the word, set the char code to true
        if (this.currentWordAscii[keyPressedCode] !== undefined) {
          this.currentWordAscii[keyPressedCode] = true;
        } else {
          // if the user enters a wrong letter, decrease guesses remaining by 1
          this.updateGuessesRemaining();
        }
      }
    }
  },

  // decrease guesses remaining by 1
  updateGuessesRemaining: function() {
    if (this.remainingGuesses > 0) {
      this.remainingGuesses--;
    }
  },

  checkForEndCondition: function() {
    // assume game is over and user won
    var endFlag = true;
    var userWins = true;

    // if the user didn't guess all of the letters, game may not be over
    for (var charCode in this.currentWordAscii) {
      if (!this.currentWordAscii[charCode]) {
        endFlag = false;
        userWins = false;
      }
    }

    // game is over when user runs out of guesses
    if (game.remainingGuesses <= 0) {
      endFlag = true;
    }

    if (endFlag && this.inProgress) {
      this.inProgress = false;
      
      // if the user won, update the win count and display the school's logo
      if (userWins) {
        this.statusText = CONSTANTS.WIN;
        this.wins++;

        displayTeamLogo();
      } else {
        // update the loss count
        this.statusText = CONSTANTS.LOSS;
        this.losses++;
      }
    }
  },

  updateGameState: function(keyPressedCode = null) {
    // update guess history array if the game is in progress
    if (this.inProgress) {
      this.updateLettersGuessed(keyPressedCode);
    }

    // check if the game is at an end state
    this.checkForEndCondition();

    updateUI();
  }
}

function updateUI() {
  updateGameStatusUI();
  updateCurrentWordUI();
  updateGuessHistoryUI();
}

function updateGameStatusUI() {
  // update game status elements
  gameStatusElement.textContent = game.statusText;
  winCountElement.textContent = game.wins;
  lossCountElement.textContent = game.losses;
  numGuessesRemainingElement.textContent = game.remainingGuesses;
}

function updateCurrentWordUI() {
  // updates current word display
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
    
    if (game.inProgress) {
      if (game.lettersGuessed.indexOf(charCode) >= 0) {
        currentWordLetter.textContent = String.fromCharCode(charCode);
      } else if (char.charCodeAt(0) === 32) {
        currentWordLetter.textContent = ' ';
      } else {
        currentWordLetter.textContent = '_';
      }
    } else {
      // display the letters not guessed in red
      if (game.lettersGuessed.indexOf(charCode) >= 0) {
        currentWordLetter.textContent = String.fromCharCode(charCode);
      } else if (char.charCodeAt(0) === 32) {
        currentWordLetter.textContent = ' ';
      } else {
        currentWordLetter.textContent = String.fromCharCode(charCode);
        currentWordLetter.setAttribute('class', 'mx-2 text-danger');
      }
    }
    
    
    currentWordListElement.appendChild(currentWordLetter);
  }
}

function updateGuessHistoryUI() {
  // updates letters guessed display
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

// displays the applicable team's logo if the user wins
function displayTeamLogo() {
  var teamLogoImgElement = document.createElement('img');
  teamLogoImgElement.setAttribute('src', game.imgUrl);

  teamLogoElement.appendChild(teamLogoImgElement);
}

// listen to the user's key presses
document.onkeyup = function(event) {
  var keyPressedCode = event.keyCode;

  // if the game is not in progress and the space bar was pressed, start a new game
  if (!game.inProgress && keyPressedCode === 32) {
    // startNewGame();
    game.startNewGame();
  }

  game.updateGameState(keyPressedCode);
}

// update game UI on browser load
updateUI();