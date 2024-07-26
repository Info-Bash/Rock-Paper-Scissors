let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Ties: 0,
  Loses: 0,
};

scoreElement();

/* if (!score){
score = {
  Wins: 0,
  Ties: 0,
  Loses: 0,
};
}; */

function scoreElement (){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins}, Ties: ${score.Ties}, Loses: ${score.Loses}.`;
}


function pickComputerMove () {

  let computerMove = '';

  const randomNumber = Math.random();
  if(randomNumber > 0 && randomNumber <= 1/3){
    computerMove = 'Rock';
  } else if (randomNumber > 1/3 && randomNumber <= 2/3){
    computerMove = 'Paper';
  } else if (randomNumber > 2/3 && randomNumber <= 1){
    computerMove = 'Scissors';
  }

  // a return statement let us get value out of a function

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

const autoplay = document.querySelector('.auto-play');
autoplay.addEventListener('click', () => {
    autoPlay();
  })

function autoPlay (){
  if (!isAutoPlaying){
    /* implemented arrow function */
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        rockPaperScissor(playerMove);
        autoplay.innerHTML = 'Stop playing'
      }, 1000
    );
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId)
    isAutoPlaying = false;
    autoplay.innerHTML = 'Auto play'
  }
}

/* implementing addEventListener instead of an onclick Attribute */

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    stopAutoPlaying('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    stopAutoPlaying('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    stopAutoPlaying('Scissors');
  });

/* Stop auto playing before playing */

  function stopAutoPlaying (move){
    if (isAutoPlaying){
      alert('Stop Auto Playing First');
    } else {
      rockPaperScissor(move);
    }
  }

/* adding play with keyboard feature usin r, p and s */

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key ===  'R'){
    rockPaperScissor('Rock');
  } else if (event.key === 'p' || event.key ===  'P'){
    rockPaperScissor('Paper');
  } else if (event.key === 's' || event.key ===  'S'){
    rockPaperScissor('Scissors')
  } else if (event.key === 'a' || event.key === 'A'){
    autoPlay()
  } else if (event.key === 'Backspace') {
    resetscorefun()
  }
});

/* Playing the game */

function rockPaperScissor(playerMove) {

  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors'){

    if (computerMove === 'Rock'){
      result = 'You Lose';
    } else if (computerMove === 'Paper'){
      result = 'You Win';
    } else if (computerMove === 'Scissors'){
      result = 'Tie';
    }

  } else if (playerMove === 'Rock'){

    if (computerMove === 'Rock'){
      result = 'Tie';
    } else if (computerMove === 'Paper'){
      result = 'You Lose';
    } else if (computerMove === 'Scissors'){
      result = 'You Win';
    }

  } else if (playerMove === 'Paper'){

    if (computerMove === 'Rock'){
      result = 'You Win';
    } else if (computerMove === 'Paper'){
      result = 'Tie';
    } else if (computerMove === 'Scissors'){
      result = 'You Lose';
    }

  } if (result === 'You Win'){
    score.Wins += 1; 
  } else if (result === 'Tie'){
    score.Ties += 1;
  } else if (result === 'You Lose'){
    score.Loses += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  scoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-move')
    .innerHTML = `You <img class="move-icon" src="./images/${playerMove}-emoji.png" alt=""> <img class="move-icon" src="./images/${computerMove}-emoji.png" alt="">
    Computer`;

  document.querySelector('.js-resetScore')
    .innerHTML = '';
}

/* reset score button function */

document.querySelector('.resetScore')
  .addEventListener('click', () => {
    if (isAutoPlaying){
      alert('Stop Auto Playing First');
    } else {
      resetQuestion();
    }
  });

let resetIntervalId;

/* reseting the score in localstorage */

function resetscorefun (){
  score.Loses = 0;
  score.Ties = 0;
  score.Wins = 0;
  localStorage.removeItem('score');
  const resetTimeOut = document.querySelector('.js-resetScore');
  resetTimeOut.innerHTML = 'The Score has been Reset Successfully';
  scoreElement();
  clearInterval(resetIntervalId);

  resetIntervalId = setInterval(() => {
    resetTimeOut.innerHTML = '';
  }, 2000)
}

const getClass = document.querySelector('.reset-question');

function resetQuestion (){

  if (!getClass.classList.contains('resetQuestion2')){
    getClass.classList.add('resetQuestion2');
  } /* else {
    getClass.classList.remove('resetQuestion2');
  } */
}

/* deside to delete score or not */

document.querySelector('.yes-reset')
  .addEventListener('click', () => {
    deside('yes');
  })

document.querySelector('.no-reset')
.addEventListener('click', () => {
  deside('no');
})

function deside (choose){
  if (choose === 'yes'){
    clearInterval(resetIntervalId);
    getClass.classList.remove('resetQuestion2');
    resetscorefun();
  } else {
    getClass.classList.remove('resetQuestion2');
  }
}




/* (My own reset score code)
function resetScore () {
alert(`The scores has been reset
Wins: ${score.Wins = 0}, Ties: ${score.Ties = 0}, Loses: ${score.Loses = 0}. `);
} */