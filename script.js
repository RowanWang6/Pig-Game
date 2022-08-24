'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Initialization
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
let playerActive = 0;
// Generate random dice roll
document.querySelector('.btn--roll').addEventListener('click', function () {
  const num = Math.trunc(Math.random() * 6 + 1);
  dice.classList.remove('hidden');
  dice.src = `dice-${num}.png`;

  if (playerActive === 0) {
    rollDice(current0, score0, num, player0);
  } else if (playerActive === 1) {
    rollDice(current1, score1, num, player1);
  }
});

function rollDice(current, score, num, player) {
  current.textContent = num + Number(current.textContent);
  // score.textContent = Number(current.textContent) + Number(score.textContent);
  if (num === 1) {
    current.textContent = 0;
    // score.textContent = 0;
    activeAnotherPlayer(player);
  }
}

document.querySelector('.btn--new').addEventListener('click', newGame);

function newGame() {
  document.querySelector('.btn--roll').disabled = false;
  document.querySelector('.btn--hold').disabled = false;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  if (playerActive) activeAnotherPlayer(player1);
}

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playerActive === 0) {
    hold(current0, score0, player0);
  } else if (playerActive === 1) {
    hold(current1, score1, player1);
  }
  if (score0.textContent >= 100) {
    alert('Player 0 is the winner!🌟');
    document.querySelector('.btn--roll').disabled = true;
    document.querySelector('.btn--hold').disabled = true;
  } else if (score1.textContent >= 100) {
    alert('Player 1 is the winner!🌟');
    document.querySelector('.btn--roll').disabled = true;
    document.querySelector('.btn--hold').disabled = true;
  }
});

function hold(current, score, player) {
  score.textContent = Number(score.textContent) + Number(current.textContent);
  current.textContent = 0;
  activeAnotherPlayer(player);
}

function activeAnotherPlayer(player) {
  player.classList.remove('player--active');
  playerActive = Math.abs(1 - playerActive);
  switch (playerActive) {
    case 0:
      player0.classList.add('player--active');
      break;
    case 1:
      player1.classList.add('player--active');
      break;
  }
}

if (Number(score0.textContent) >= 100) {
  alert('Player 0 is the winner!🌟');
} else if (score1.textContent >= 100) {
  alert('Player 1 is the winner!🌟');
}
