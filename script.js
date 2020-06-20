let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');

const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentStreak = 0;
let bestStreak = 0;
let currentlyPlaying = true;

// generate random chore at each door
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

// check if the current door is the bot door
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

// enforces that each door is clicked once
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return true;
  } else {
    return false;
  }
};

// ends the game when a certain stage is reaches
const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?';
  }
  currentlyPlaying = false;
};

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
    updateScore();
    updateBestStreak();
  } else if (isBot(door)) {
    gameOver()
  }
};

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = 'Good luck!';
  currentStreak = 0;
  document.getElementById('current-streak').innerHTML = currentStreak;
  currentlyPlaying = true;
  randomChoreDoorGenerator()
}

const updateScore = () => {
  currentStreak++;
  document.getElementById('current-streak').innerHTML = currentStreak;
}

const updateBestStreak = () => {
  if (currentStreak) bestStreak++;
  document.getElementById('highest-streak').innerHTML = bestStreak;
}

startButton.onclick = () => {
  if (!currentlyPlaying) startRound();
};


startRound();
