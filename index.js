// Generate a random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// Select necessary DOM elements
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

// Create a new paragraph element for displaying the new game button
const p = document.createElement("p");

// Initialize variables to store previous guesses and the number of guesses
let prevGuess = [];
let numGuess = 1;

// Flag to check if the game is active
let playGame = true;

// Event listener for the submit button to process the user's guess
if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    const guess = parseInt(userInput.value); // Get the user's guess and convert it to an integer
    console.log(guess); // Log the guess to the console for debugging
    validateGuess(guess); // Validate the user's guess
  });
}

// Function to validate the user's guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    // Check if the guess is a number
    alert("Please enter a valid number");
  } else if (guess < 1) {
    // Check if the guess is less than 1
    alert("Please enter a number more than 1");
  } else if (guess > 100) {
    // Check if the guess is greater than 100
    alert("Please enter a number less than 100");
  } else {
    // If the guess is valid, add it to the list of previous guesses
    prevGuess.push(guess);
    if (numGuess === 11) {
      // Check if the maximum number of guesses (10) has been reached
      displayGuess(guess); // Display the guess
      displayMessage(`Game Over. Random number was ${randomNumber}`); // Display game over message
      endGame(); // End the game
    } else {
      // If the maximum number of guesses has not been reached
      displayGuess(guess); // Display the guess
      checkGuess(guess); // Check if the guess is correct
    }
  }
}

// Function to check if the user's guess is correct
function checkGuess(guess) {
  if (guess === randomNumber) {
    // If the guess is correct
    displayMessage(`You guessed it right`); // Display a success message
    endGame(); // End the game
  } else if (guess < randomNumber) {
    // If the guess is too low
    displayMessage(`Number is TOO low`); // Display a hint message
  } else if (guess > randomNumber) {
    // If the guess is too high
    displayMessage(`Number is TOO High`); // Display a hint message
  }
}

// Function to display the user's guess and update the remaining guesses
function displayGuess(guess) {
  userInput.value = ""; // Clear the input field
  guessSlot.innerHTML += `${guess}, `; // Append the guess to the guess slot
  numGuess++; // Increment the number of guesses
  remaining.innerHTML = `${11 - numGuess} `; // Update the remaining guesses
}

// Function to display a message
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`; // Display the message in the lowOrHi element
}

// Function to end the game
function endGame() {
  userInput.value = ""; // Clear the input field
  userInput.setAttribute("disabled", ""); // Disable the input field
  p.classList.add("button"); // Add a class to the new paragraph element
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`; // Set the inner HTML of the paragraph element to a new game button
  startOver.appendChild(p); // Append the new game button to the startOver element
  playGame = false; // Set the playGame flag to false
  newGame(); // Initialize a new game
}

// Function to initialize a new game
function newGame() {
  const newGameButton = document.querySelector("#newGame"); // Select the new game button
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1); // Generate a new random number
    prevGuess = []; // Reset the previous guesses array
    numGuess = 1; // Reset the number of guesses
    guessSlot.innerHTML = ""; // Clear the guess slot
    remaining.innerHTML = `${11 - numGuess} `; // Reset the remaining guesses
    userInput.removeAttribute("disabled"); // Enable the input field
    startOver.removeChild(p); // Remove the new game button
    playGame = true; // Set the playGame flag to true
  });
}
