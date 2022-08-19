//state variable, state -1, do not shoot.
const gird = document.querySelector(".grid")

for (let i = 0; i < 255; i++) {
  const sqaure = document.createElement("div")
  gird.appendChild(sqaure)
}
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");
  let width = 15;
  let currentShooterIndex = 202; // shooter
  let currentInvaderIndex = 0; // where they are in the array aliens
  let alienInvadersTakenDown = [];
  let alienBullet = [];
  let result = 0;
  let direction = 1;
  let invaderId;

  //define the alien invaders
  const alienInvaders = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
  ];

  //enter this state after pressing the "enter key"
  //therefore this is a function????
  //upon click of a button, load index.html id refresh.
  //draw the alien invaders

  //for each item in the array of alien invaders, we will choose to call an invader, pass them through sqaures, at any point value in this case point 0.

  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add("invader")
  );

  //draw the shooter
  squares[currentShooterIndex].classList.add("shooter");

  //move the shooter along a line , have the shooter go across the grid , pass through e for an event. //if the current index is 15 then, you'll be able to move left or right, if theres
  //there no longer any spaces then you will not be move more than on the grid.
  //if it's less than 15 then you'll be able to move right or left.
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.keyCode) {
      case 37:
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        break;
      case 39:
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        break;
    }

    squares[currentShooterIndex].classList.add("shooter");
  }

  document.addEventListener("keydown", moveShooter);
  const playAgain = document.getElementById("button");
  function refreshgame() {
    window.location.reload();
  }

  function gameOver() {
    let button = document.createElement("button");
    button.classList.add("grid__play-again");
    button.innerText = "Play again?";

    button.addEventListener("click", refreshgame);
    playAgain.appendChild(button);

    console.log(gameOver);
    console.log(button);
    // location.reload(button).addEventListener('click', reload);
  }

  // var reload =  button.addEventListener('click', reload);

  //move the alien invaders
  //they will move down a row each time inside of a time loop.
  //check the left edge
  //and the right edge
  //check both direction
  //we want the aliens to move on a row
  //and loop again to move again within the row.

  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    //move the laser from the shooter to the alien invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          100
        );
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alienInvadersTakenDown.push(alienTakenDown);
        result += 3 * 5;
        resultDisplay.textContent = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(
          () => squares[currentLaserIndex].classList.remove("laser"),
          200
        );
      }
    }

    function bomb() {
      let Alienbomb =  currentInvaderIndex

      squares[currentShooterIndex].classList.remove('laser')
      currentLaserIndex -= width

      sqaures[currentLaserIndex].classList.add('laser')

      if (sqaures[currentInvaderIndex].classList.contains('invader')) {
        sqaures[currentShooterIndex].classList.remove('laser')

      }
    }
    // game over state remove option to fire.

    document.addEventListener('keyup', e => {
      if (e.keyCode === 32) {
        laserId = setInterval(moveLaser, 100)
      }
    })
    //state variable, state -1, do not shoot.

    switch (e.keyCode) {
      case 38:
        laserId = setInterval(moveLaser, 50);
        break;
    }
  }

  document.addEventListener("keyup", shoot);

  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove("invader");
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      //ADD IF LATER
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add("invader");
      }

      if (
        squares[currentShooterIndex].classList.contains("invader", "shooter")
      ) {
        resultDisplay.textContent = "Game Over";
        squares[currentShooterIndex].classList.add("boom");
        clearInterval(invaderId);
        //player can no longer shoot, move
        document.removeEventListener("keyup", shoot);
        document.removeEventListener("keydown", moveShooter);
        //quote
        //play again? click event append button
        // if (gameState) {
        //   gameState = false;
        //   gameOver();
        //   console.log(gameState);
        // }
        // console.log(moveInvaders);
        // }
        gameOver() = true;
      }

      for (let i = 0; i <= alienInvaders.length - 1; i++) {
        if (alienInvaders[i] > squares.length - (width - 1)) {
          resultDisplay.textContent = "Game Over";
          clearInterval(invaderId);
          //quote
          //player can no longer shoot, move
          document.removeEventListener("keyup", shoot);
          document.removeEventListener("keydown", moveShooter);
          //quote
          //play again? click event append button
                  if (gameState) {
            gameState = false;
                    gameOver();

                    console.log(gameState);
          }
          gameOver() = true;
        }
      }

      if (alienInvadersTakenDown.length === alienInvaders.length) {
        console.log(alienInvadersTakenDown.length);
        console.log(alienInvaders.length);
        resultDisplay.textContent = "You Win";
        clearInterval(invaderId);
        //player can no longer shoot, move
        document.removeEventListener("keyup", shoot);
        document.removeEventListener("keydown", moveShooter);
        //play again? click event append button
        //     if (gameState) {
        //   gameState = false;
        //       gameOver();
        //       console.log(gameState);
        // }
        gameOver() = true;
      }
    }
  }

  // console.log(moveShooter);
  // console.log(shoot)

  invaderId = setInterval(moveInvaders, 250);
});

//game state
//if the invader has gotten to the shooter within the same sqaure, then the game is over
if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
  resultDisplay.textContent = 'Game Over'
  squares[currentShooterIndex].classList.add('boom')
  clearInterval(invaderId)
}
// if game state is over, grid = null
// if game is over, grid displays "game over"
//remove shoot

//if game state is over, add button to reset the game state to the beginning
//while game is over, add statment of API "affrimations"
//press enter to replay the game (start at beginning.)

// commentForm.addEventListener("submit", (event) => {
// console.log("submit");
//   event.preventDefault();

//put into a function, if game over "send api"
//if the aliens miss the shooter but reach the end of the grid then the game is over too. we must add 1 more for and if statement declaring the game is over if the alien has shot the shooter.
for (let i = 0; i <= alienInvaders.length - 1; i++){
  if(alienInvaders[i] > (squares.length - (width -1))){
    resultDisplay.textContent = 'Game Over'
    clearInterval(invaderId)
  }
}

grid = "null"

//ADD LATER
// if(alienInvadersTakenDown.length === alienInvaders.length) {
//   console.log(alienInvadersTakenDown.length)
//   console.log(alienInvaders.length)
//   resultDisplay.textContent = 'You Win'
//   clearInterval(invaderId)
// }

//if invaders taken down, you win, ask to play again?

//shoot at aliens
const keepGoing = document.querySelector(".quote");

let cheer;
let yay = axios
  .get("http://localhost:8080/https://www.affirmations.dev/")
  .then((response) => {
    cheer = response.data.affirmation;
    console.log(cheer);

    const text = document.createElement("h4");
    text.classList.add("grid__keep-going");
    text.innerText = cheer;

    keepGoing.appendChild(text);
  });

// squares;

document.addEventListener("keydown", (event) => {
  console.log(event.key);
});

// const affrimations = "https://www.affirmations.dev/"
//   axios.get(affrimations, {mode: 'cors'}) .then(response => {
//     console.log(response)
//   });

// fetch('https://www.affirmations.dev/', {
//   mode: 'cors',
//   credentials: 'include'
//   Access- Control - Allow - Origin:
//   Access - Control - Allow - Credentials: true;
// })

// fetch('https://www.affirmations.dev/', { mode: 'cors' })

// function getPages() {

// console.log(getPages())
