var gameStatus = false;
var currentWord;
var lettersGuessed = [];
var guessesRemaining;

var wordsList = ['Illinois', 'Indiana', 'Ohio State', 'Iowa', 'Northwestern', 'Minnesota', 'Michigan', 'Michigan State', 'Penn State', 'Maryland', 'Rutgers', 'Wisconsin', 'Purdue', 'Nebraska'];

var gameStatusElement = document.getElementById('gameStatus');
var currentWordElement = document.getElementById('currentWord');
var lettersGuessedElement = document.getElementById('lettersGuessed');

function updateGameScreen(keyPressedCode = null) {
  // update game status text
  if (!gameStatus) {
    gameStatusElement.textContent = 'Press Any Key To Get Started';
  } else {
    gameStatusElement.textContent = 'Press Any Letter To Continue Guessing';
  }

  // update current word
  updateCurrentWord(keyPressedCode);

  // update remaining guesses count

  // update guess history array

  // check for end condition
}

function updateCurrentWord(keyPressedCode = null) {
  if (currentWord !== undefined) {
    if (keyPressedCode === null) {
      var currentWordListElement = document.createElement('ul');
      currentWordListElement.setAttribute('id', 'currentWordList');
      currentWordListElement.setAttribute('class', 'currentWord');

      currentWordElement.appendChild(currentWordListElement);

      for (var char of currentWord) {
        var currentWordLetter = document.createElement('li');
        currentWordLetter.setAttribute('class', 'mx-2');
        
        if (char.charCodeAt(0) === 32) {
          currentWordLetter.textContent = ' ';
        } else {
          currentWordLetter.textContent = '_';
        }
        
        currentWordListElement.appendChild(currentWordLetter);
        console.log(char);
        console.log(char.charCodeAt(0));
      }
    } else {


    }
  }
}

function updateGuessesRemaining() {
  if (!gameStatus) {
    guessesRemaining = 0;
  }
}

function updateLettersGuessed(keyPressedCode = null) {
  if (keyPressedCode !== null && keyPressedCode >= 65 && keyPressedCode <= 90) {
    if (lettersGuessed.indexOf(keyPressedCode) === -1) {
      lettersGuessed.push(keyPressedCode);
    }
  }
}

document.onkeyup = function(event) {
  var keyPressed = event.key;
  var keyPressedCode = event.keyCode;

  if (gameStatus) {
    // Game already in progress

  } else {
    // New game
    gameStatus = true;
    var randomIndex = Math.floor(Math.random() * wordsList.length);
    currentWord = wordsList[randomIndex].toUpperCase();
    console.log(currentWord);
  }

  // update current word

  // update remaining guesses count

  // update guess history array

  // check for end condition

  updateGameScreen(keyPressedCode);
}

updateGameScreen();