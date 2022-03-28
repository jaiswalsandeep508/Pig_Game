'use strict';

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Add random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    //3. Update the score
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      //Next Player
      nextPlayer();
    }

    //   if (dice === 6 && lastDice === 6) {
    //     // loose the score
    //     scores[activePlayer] = 0;
    //     document.querySelector('#score--' + activePlayer).textContent = '0';
    //     nextPlayer();
    //   } else if (dice !== 1) {
    //     roundScore += dice;
    //     document.querySelector('#current--' + activePlayer).textContent =
    //       roundScore;
    //   } else {
    //     //Next Player
    //     nextPlayer();
    //   }

    //   lastDice = dice;
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    //check if the player won the match

    var input = document.querySelector('.final_score').value;
    var winningScore;
    // Undefined, Null, 0 , ' ' are false
    // any other values are true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
