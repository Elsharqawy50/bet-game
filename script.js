"use strict";

const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const currentOne = document.querySelector("#current--0");
const currentTwo = document.querySelector("#current--1");
const scoreOne = document.querySelector("#score--0");
const scoreTwo = document.querySelector("#score--1");

const nameOne = document.querySelector("#name--0");
const nameTwo = document.querySelector("#name--1");

let curNum = 0;
let scoreNumOne = 0;
let scoreNumTwo = 0;
diceImg.style.display = "none";

// helper func to swipe the players
const swipePlayersFunc = () => {
  curNum = 0;
  currentOne.textContent = curNum;
  currentTwo.textContent = curNum;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
};

// helper func when a player win
const winFunc = (player) => {
  curNum = 0;
  rollBtn.setAttribute("disabled", "true");
  holdBtn.setAttribute("disabled", "true");
  diceImg.style.display = "none";

  if (player === "player 1") {
    currentOne.textContent = curNum;
    nameOne.textContent = "Player 1 win!";
    playerOne.classList.add("player--winner");
  } else if (player === "player 2") {
    currentTwo.textContent = curNum;
    nameTwo.textContent = "Player 2 win!";
    playerTwo.classList.add("player--winner");
  }
};

rollBtn.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceImg.style.display = "block";
  diceImg.src = `images/dice-${randomNum}.png`;

  if (randomNum === 1) {
    swipePlayersFunc();
  } else {
    curNum += randomNum;

    // player one turn
    if (playerOne.classList.contains("player--active")) {
      currentOne.textContent = curNum;

      // player two turn
    } else if (playerTwo.classList.contains("player--active")) {
      currentTwo.textContent = curNum;
    }
  }
});

holdBtn.addEventListener("click", () => {
  // player one turn
  if (playerOne.classList.contains("player--active")) {
    scoreNumOne += curNum;
    scoreOne.textContent = scoreNumOne;
    if (scoreNumOne >= 100) {
      winFunc("player 1");
      return;
    }
    swipePlayersFunc();

    // player two turn
  } else if (playerTwo.classList.contains("player--active")) {
    scoreNumTwo += curNum;
    scoreTwo.textContent = scoreNumTwo;
    if (scoreNumTwo >= 100) {
      winFunc("player 2");
      return;
    }
    swipePlayersFunc();
  }
});

newGameBtn.addEventListener("click", () => {
  curNum = 0;
  scoreNumOne = 0;
  scoreNumTwo = 0;
  scoreOne.textContent = scoreNumOne;
  scoreTwo.textContent = scoreNumTwo;
  currentOne.textContent = curNum;
  currentTwo.textContent = curNum;
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
  nameOne.textContent = "Player 1";
  nameTwo.textContent = "Player 2";
  diceImg.style.display = "none";
  rollBtn.removeAttribute("disabled");
  holdBtn.removeAttribute("disabled");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
});
