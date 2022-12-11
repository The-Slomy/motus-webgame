// Screen variables declarations

let randomWord;
let randomWordArr;
let txtFileArr;
const gameGrid = document.querySelector(".game-grid");
const currentWordArr = [];

// Integrate french word text file

getWordToGuess(); // Launch the fetch(text file)

function getWordToGuess() {
  getWordList(filterTextArr);
}

function getWordList(callback) {
  fetch("fr_word_list.txt")
    .then((response) => response.text())
    .then((file) => {
      callback(file.split("\n"));
    });
}

function filterTextArr(fileArr) {
  const filteredFileArr = fileArr.filter(
    (word) => word.length > 4 && word.length < 9
  );
  filteredFileArr.forEach((word, index) => {
    filteredFileArr[index] = word.toLowerCase();
  });
  txtFileArr = filteredFileArr;
  return getRandomWord(filteredFileArr);
}

function getRandomWord(filteredFileArr) {
  const randomIndex = Math.floor(Math.random() * filteredFileArr.length);
  randomWord = filteredFileArr[randomIndex];
  randomWordArr = randomWord.split("");

  createGameGrid();
}

// Functions

function createGameGrid() {
  const wordLength = randomWord.length;
  const gameTile = document.createElement("div");
  gameTile.setAttribute("class", "grid-tile");
  gameGrid.childNodes.forEach((item) => {
    for (let i = 0; i < wordLength; i++) {
      if (item.nodeType !== 3) {
        const currentTile = item.appendChild(gameTile.cloneNode(true));
        item.appendChild(currentTile);
        if (i === 0) {
          currentTile.textContent = randomWord[0];
          currentTile.classList.add("show-grid-tile-match");
          currentTile.classList.add("grid-tile-disabled");
        }
      }
    }
  });
}

function addDigitalKeyPressed(letter) {
  const alphabetRegex = /[a-zA-Z]/;
  const isValid = alphabetRegex.test(letter) && letter.length === 1;
  const currentRow = document.querySelector(
    "div.grid-row:not(.grid-row-disabled"
  );
  if (isValid) {
    for (let i = 0; i < currentRow.childNodes.length; i++) {
      item = currentRow.childNodes[i];
      if (item.textContent.length === 0) {
        item.textContent = letter;
        item.classList.add("typed-tile");
        break;
      }
    }
  }
}

function addKeyPressed(event) {
  const alphabetRegex = /[a-zA-Z]/;
  const isValid = alphabetRegex.test(event.key) && event.key.length === 1;
  const currentRow = document.querySelector(
    "div.grid-row:not(.grid-row-disabled"
  );
  if (isValid) {
    for (let i = 0; i < currentRow.childNodes.length; i++) {
      item = currentRow.childNodes[i];
      if (item.textContent.length === 0) {
        item.textContent = event.key;
        item.classList.add("typed-tile");
        break;
      }
    }
  }
}

function removeLastLetterDigital() {
  const currentRow = document.querySelector(
    "div.grid-row:not(.grid-row-disabled"
  );
  const typedTilesArr = currentRow.querySelectorAll(".typed-tile");
  const lastTypedTile = typedTilesArr[typedTilesArr.length - 1];
  lastTypedTile.textContent = "";
  lastTypedTile.classList.remove("typed-tile");
}

function removeLastLetter(event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    const currentRow = document.querySelector(
      "div.grid-row:not(.grid-row-disabled"
    );
    const typedTilesArr = currentRow.querySelectorAll(".typed-tile");
    const lastTypedTile = typedTilesArr[typedTilesArr.length - 1];
    lastTypedTile.textContent = "";
    lastTypedTile.classList.remove("typed-tile");
  }
}

function checkWordMatchDigital() {
  const currentRow = document.querySelector(
    "div.grid-row:not(.grid-row-disabled"
  );
  const guessedWordArr = Array.from(currentRow.childNodes);
  let word = "";
  for (let i = 0; i < guessedWordArr.length; i++) {
    word = word + guessedWordArr[i].textContent;
  }
  if (txtFileArr.indexOf(word) !== -1) {
    for (let i = 0; i < guessedWordArr.length; i++) {
      if (guessedWordArr[i].textContent === "") {
        guessedWordArr.splice(i, 1);
      }
    }
    if (guessedWordArr.length < randomWordArr.length) {
      alert("Le mot testé est trop court");
    } else {
      checkEachLetter(guessedWordArr);
    }
  } else {
    alert("Ce mot n'existe pas");
  }
}

function checkWordMatch(event) {
  if (event.key === "Enter") {
    const currentRow = document.querySelector(
      "div.grid-row:not(.grid-row-disabled"
    );
    const guessedWordArr = Array.from(currentRow.childNodes);
    let word = "";
    for (let i = 0; i < guessedWordArr.length; i++) {
      word = word + guessedWordArr[i].textContent;
    }
    if (txtFileArr.indexOf(word) !== -1) {
      for (let i = 0; i < guessedWordArr.length; i++) {
        if (guessedWordArr[i].textContent === "") {
          guessedWordArr.splice(i, 1);
        }
      }
      if (guessedWordArr.length < randomWordArr.length) {
        alert("Le mot testé est trop court");
      } else {
        checkEachLetter(guessedWordArr);
      }
    } else {
      alert("Ce mot n'existe pas");
    }
  }
}

function checkEachLetter(wordArrNode) {
  // Break down the word typed by the user into an array
  const wordArr = [];
  // Create an array with all the letters present in the random word (and their quantity)
  const lettersInWordArr = [];
  wordArrNode.forEach((item) => {
    wordArr.push(item.textContent);
  });
  randomWordArr.forEach((item) => {
    const index = lettersInWordArr.map((arr) => arr.letter).indexOf(item);
    if (index !== -1) {
      lettersInWordArr[index].quantity = lettersInWordArr[index].quantity + 1;
    } else lettersInWordArr.push({ letter: item, quantity: 1, matchFound: 0 });
  });
  for (let i = 0; i < wordArr.length; i++) {
    // Get the index corresponding to the letter being evaluated in the array stocking all the letter present in the word to guess
    const indexOfLettersArr = lettersInWordArr
      .map((arr) => arr.letter)
      .indexOf(wordArr[i]);
    if (randomWordArr.indexOf(wordArr[i]) !== -1) {
      // If current letter is in the word to guess
      if (randomWordArr.indexOf(wordArr[i], i) === i) {
        // If it's positionning = the positionning of the current letter (note : from current index to handle duplicates)
        wordArrNode[i].classList.add("grid-tile-match");
        lettersInWordArr[indexOfLettersArr].matchFound++; // matchFound++ to then check if matchFound = quantity (avoid having too much letters in yellow in comparison to the actual number of this letter in the word to guess)
      } else {
        if (
          lettersInWordArr[indexOfLettersArr].quantity !==
          lettersInWordArr[indexOfLettersArr].matchFound
        ) {
          wordArrNode[i].classList.add("grid-tile-exists");
          lettersInWordArr[indexOfLettersArr].matchFound++;
        }
      }
    }
  }
  // Re-check : https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop (good intro to promises ?)
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function load() {
    for (let i = 0; i < wordArr.length; i++) {
      // Re-iterate through the word guessed to remove yellow letter in case a match was found later and matchFound > quantity
      const indexOfLettersArr = lettersInWordArr
        .map((arr) => arr.letter)
        .indexOf(wordArr[i]);
      if (
        randomWordArr.indexOf(wordArr[i]) !== -1 &&
        lettersInWordArr[indexOfLettersArr].matchFound >
          lettersInWordArr[indexOfLettersArr].quantity
      ) {
        wordArrNode[i].classList.remove("grid-tile-exists");
        lettersInWordArr[indexOfLettersArr].matchFound--;
      }
      wordArrNode[i].classList.add("grid-tile-checked");
      if (wordArrNode[i].classList.contains("grid-tile-match")) {
        wordArrNode[i].classList.add("show-grid-tile-match");
      } else if (wordArrNode[i].classList.contains("grid-tile-exists")) {
        wordArrNode[i].classList.add("show-grid-tile-exists");
      }
      await timer(500);
      wordArrNode[i].classList.remove("grid-tile-checked"); // remove class animating the check to avoid having all letters getting animated later
    }
    // Update the digital keyboard after all letters are checked (so inside the asynch load() fucntion)
    showLettersFoundKeyboard(wordArr, wordArrNode);
  }
  load();
  // This row is now disabled
  wordArrNode[0].parentNode.classList.add("grid-row-disabled");
}

function showLettersFoundKeyboard(wordArr, wordArrNode) {
  //Get all digital keyboard letters
  const lettersArrNode = document.querySelectorAll(
    ".keyboard-btn:not(.keyboard-btn-large"
  );
  // New arr with only letters as values
  const lettersArr = Array.from(lettersArrNode).map((arr) =>
    arr.textContent.replace(/\n/g, "").replaceAll(" ", "")
  );
  wordArr.forEach((item, index) => {
    const lettersArrIndex = lettersArr.indexOf(item);
    if (wordArrNode[index].classList.contains("show-grid-tile-match")) {
      //Add the match status to the letter
      if (
        !lettersArrNode[lettersArrIndex].classList.contains(
          "show-grid-tile-match"
        )
      ) {
        lettersArrNode[lettersArrIndex].classList.add("show-grid-tile-match");
        lettersArrNode[lettersArrIndex].classList.remove(
          "show-grid-tile-exists"
        );
        lettersArrNode[lettersArrIndex].classList.remove(
          "grid-letter-inexistant"
        );
      }
    } else if (wordArrNode[index].classList.contains("show-grid-tile-exists")) {
      //Add the exists status to the letter
      if (
        !lettersArrNode[lettersArrIndex].classList.contains(
          "show-grid-tile-exists"
        ) &&
        !lettersArrNode[lettersArrIndex].classList.contains(
          "show-grid-tile-match"
        )
      ) {
        lettersArrNode[lettersArrIndex].classList.add("show-grid-tile-exists");
      }
    } else {
      //Add inexistant status only if this letter doesn't have the class of exists or match
      if (
        !lettersArrNode[lettersArrIndex].classList.contains(
          "show-grid-tile-exists"
        ) &&
        !lettersArrNode[lettersArrIndex].classList.contains(
          "show-grid-tile-match"
        )
      ) {
        lettersArrNode[lettersArrIndex].classList.add("grid-letter-inexistant");
      }
    }
  });
}

function togglePopUp() {
  document.querySelector(".pop-up").hidden
    ? (document.querySelector(".pop-up").hidden = false)
    : (document.querySelector(".pop-up").hidden = true);
}

function openPopup(className) {
  document.querySelector("." + className).hidden = false;
  const otherPopups = document.querySelectorAll(
    "article.pop-up-article:not(." + className
  );
  otherPopups.forEach((item) => {
    item.hidden = true;
  });

  togglePopUp();
}

function toggleColorMode() {
  const colorModeDiv = document.querySelector(".color-mode");
  const colorModeIcon = document.querySelector(".color-mode-icon");
  const colorModeText = document.querySelector(".color-mode-text");
  let iconTextVariable = "light_mode";
  let divTextVariable = "Mode clair";
  colorModeIcon.textContent = iconTextVariable;
  colorModeText.textContent = divTextVariable;

  if (colorModeDiv.classList.contains("light-mode")) {
    //If light mode on -> swap to dark mode
    colorModeDiv.classList.remove("light-mode");
    colorModeDiv.classList.add("dark-mode");
    iconTextVariable = "dark_mode";
    divTextVariable = "Mode sombre";
    colorModeIcon.textContent = iconTextVariable;
    colorModeText.textContent = divTextVariable;
  } else {
    //If dark mode on -> swap to light mode
    colorModeDiv.classList.remove("dark-mode");
    colorModeDiv.classList.add("light-mode");
    iconTextVariable = "light_mode";
    divTextVariable = "Mode clair";
    colorModeIcon.textContent = iconTextVariable;
    colorModeText.textContent = divTextVariable;
  }
}

// Screen events

window.addEventListener("keypress", addKeyPressed);
window.addEventListener("keydown", removeLastLetter);
window.addEventListener("keydown", checkWordMatch);
// Hide pop-up
document.querySelector(".pop-up").hidden = true;
