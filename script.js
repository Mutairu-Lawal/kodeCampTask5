"use strict";

const playerOneScore = document.querySelector("#score--0");
const playerOneCurrentScore = document.querySelector("#current--0");
const playerTwoScore = document.querySelector("#score--1");
const playerTwoCurrentScore = document.querySelector("#current--1");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const diceImage = document.querySelector(".dice");
const resetButton = document.querySelector(".btn--new");

let isPlayerOneTurn = true;
let isPlayerTwoTurn = false;
let currentScore = 0;
let isWinner = false;
let dice;
const getDiceImage = () => {
  diceImage.style.display = "block";
  diceImage.src = `./image/dice-${dice}.png`;
};
resetScoresToZero();

rollDiceButton.addEventListener("click", () => {
  if (!isWinner) {
    dice = Math.floor(Math.random() * 6 + 1);
    getDiceImage();
    if (isPlayerOneTurn) {
      if (dice === 1) {
        playerTwoTurn();
        return;
      }
      updateCurrentScore(playerOneCurrentScore);
    } else {
      if (dice === 1) {
        playerOneTurn();
        return;
      }
      updateCurrentScore(playerTwoCurrentScore);
    }
  }
});

holdButton.addEventListener("click", () => {
  if (!isWinner) {
    if (isPlayerOneTurn) {
      updatePlayerScore(playerOneScore);
      getWinner(playerOneScore);
      if (!isWinner) {
        playerTwoTurn();
      }
    } else {
      updatePlayerScore(playerTwoScore);
      getWinner(playerTwoScore);
      if (!isWinner) {
        playerOneTurn();
      }
    }
  }
});

resetButton.addEventListener("click", resetGame);

function playerTwoTurn() {
  isPlayerTwoTurn = true;
  isPlayerOneTurn = false;
  currentScore = 0;
  playerOneCurrentScore.innerHTML = currentScore;
  toggleActiveState();
}

function playerOneTurn() {
  isPlayerOneTurn = true;
  isPlayerTwoTurn = false;
  currentScore = 0;
  playerTwoCurrentScore.innerHTML = currentScore;
  toggleActiveState();
}

function resetScoresToZero() {
  diceImage.style.display = "none";

  playerOneScore.innerHTML = 0;
  playerTwoScore.innerHTML = 0;
  playerOneCurrentScore.innerHTML = 0;
  playerTwoCurrentScore.innerHTML = 0;
}

function toggleActiveState() {
  document.querySelector(".player--1").classList.toggle("player--active");
  document.querySelector(".player--0").classList.toggle("player--active");
}

function getWinner(playerScore) {
  const totalScore = Number(playerScore.innerHTML);
  if (totalScore >= 100) {
    if (isPlayerOneTurn) {
      document.querySelector(".player--0 ").classList.add("player--winner");
      isWinner = true;
    } else {
      document.querySelector(".player--1 ").classList.add("player--winner");
      isWinner = true;
    }
  } else {
    isWinner = false;
  }
}

function resetGame() {
  resetScoresToZero();
  isPlayerOneTurn = true;
  isPlayerTwoTurn = false;
  currentScore = 0;
  isWinner = false;

  document.querySelectorAll(".player").forEach((player) => {
    if (
      player.classList.contains("player--active") ||
      player.classList.contains("player--winner")
    ) {
      player.classList.remove("player--active");
      player.classList.remove("player--winner");
    }
  });

  document.querySelector(".player--0").classList.add("player--active");
}

function updateCurrentScore(playerCurrentScore) {
  currentScore += dice;
  playerCurrentScore.innerHTML = currentScore;
}

function updatePlayerScore(playerScore) {
  let playerTotalScore = playerScore.innerHTML;
  playerTotalScore = Number(playerTotalScore);
  playerScore.innerHTML = currentScore + playerTotalScore;
}
