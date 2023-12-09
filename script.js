"use strict";

//* Selecting Elements.
const diceEl = document.querySelector(".dice");
let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//*Buttons
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

//* Starting Conditions ;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let playing = true;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
const winPoint = 101;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//* Roll Dice Events ;
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Random dice roll ;
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    // Display dice ;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNumber}.png`; // Change SRC attribute.
    if (randomNumber !== 1) {
      // Add dice to current score if dice different than 1
      currentScore += randomNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//* Hold button event
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= winPoint) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      btnRoll.classList.add("disabled");
      btnHold.classList.add("disabled");
    }
    switchPlayer();
  }
});

//* New game button event
btnNew.addEventListener("click", function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // Reset Everything
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  diceEl.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  btnRoll.classList.remove("disabled");
  btnHold.classList.remove("disabled");
  document.querySelector(`#score--${activePlayer}`).textContent = 0;
});
