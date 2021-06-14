"use strict";
//Selection all elements from index
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

diceEl.classList.add("hidden");
//setting initial score to 0
score0El.textContent = 0;
score1El.textContent = 0;

let activePlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let playing = true;

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}
//adding event listeners to dice rolls
btnRoll.addEventListener("click", function () {
  if (playing) {
    //TODO 1. Generate a random number between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    //TODO 2. Display the dice image of that number
    diceEl.src = `dice-${dice}.png`;
    //TODO 3. check if the dice is equal to 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", function () {
  console.log("btnew clicked");
  diceEl.classList.add("hidden");
  currentScore = 0;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  scores = [0, 0];
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  player0El.classList.add("player--active");
  playing = true;
});
