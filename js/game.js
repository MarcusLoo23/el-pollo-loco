let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let sounds = [];
let isMuted = false;

backgroundSound = new Audio("./audio/background.mp3");
winSound = new Audio("./audio/win.mp3");
loseSound = new Audio("./audio/lose.mp3");
backgroundSound.loop = true;
backgroundSound.volume = 0.3;

/**
 *the game starts and all unnecessary elements are hidden
 */
function startGame() {
  document.getElementById("loseScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("winScreen").classList.add("d-none");
  document.getElementById("iconBar").classList.remove("d-none");
  document.getElementById("mobileBtnContainer").classList.remove("d-none");

  initLevel();
  initGame();
  checkMobileDevice();
  checkIsMuted();

  this.backgroundSound.play();
  sounds.push(winSound);
  sounds.push(loseSound);
  sounds.push(backgroundSound);
}

/**
 *
 */
function initGame() {
  canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
  world = new World(canvas, keyboard);
}

/**
 *
 */
function winGame() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("iconBar").classList.add("d-none");
  document.getElementById("mobileBtnContainer").classList.add("d-none");
  document.getElementById("winScreen").classList.remove("d-none");
  for (let i = 1; i < 99999; i++) window.clearInterval(i);

  sounds.forEach((sound) => {
    sound.pause();
  });
  this.winSound.play();
}

/**
 *sets the canvas to full screen
 */
function fullScreen() {
  canvas.requestFullscreen();
}

/**
 *redirect to the start page
 */
function goToHome() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("iconBar").classList.add("d-none");
  document.getElementById("winScreen").classList.add("d-none");
  document.getElementById("loseScreen").classList.add("d-none");
  document.getElementById("mobileBtnContainer").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
  for (let i = 1; i < 99999; i++) window.clearInterval(i);
  this.backgroundSound.pause();
}

/**
 *shows the lose picture, plays lose.mp3 and ends all intervals
 */
function loseGame() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("iconBar").classList.add("d-none");
  document.getElementById("mobileBtnContainer").classList.add("d-none");
  document.getElementById("loseScreen").classList.remove("d-none");
  for (let i = 1; i < 99999; i++) window.clearInterval(i);
  sounds.forEach((sound) => {
    sound.pause();
  });
  this.loseSound.play();
}

/**
 *shows and hides the gameinfos container
 */
function toggleGameInfos() {
  document.getElementById("gameInfoContainer").classList.toggle("d-none");
}

/**
 *checks whether the music is muted or not
 */
function checkIsMuted() {
  if (isMuted == true) {
    sounds.forEach((sound) => {
      sound.muted = true;
    });
  } else if (isMuted == false) {
    sounds.forEach((sound) => {
      sound.muted = false;
    });
  }
}

/**
 *checks if the window resize
 */
window.addEventListener("resize", checkMobileDevice);

/**
 *checks whether a mobile device is being used
 */
function checkMobileDevice() {
  let canvas = document.getElementById("canvas");
  if (
    window.matchMedia("(any-pointer: coarse)").matches &&
    !canvas.classList.contains("d-none")
  ) {
    document.getElementById("mobileBtnContainer").classList.remove("d-none");
  } else {
    document.getElementById("mobileBtnContainer").classList.add("d-none");
  }
}

/**
 *turns off the music
 */
function soundOff() {
  isMuted = true;
  document.getElementById("soundOn").classList.add("d-none");
  document.getElementById("soundOff").classList.remove("d-none");
  sounds.forEach((sound) => {
    sound.muted = true;
  });
}

/**
 *turns on the music
 */
function soundOn() {
  isMuted = false;
  document.getElementById("soundOff").classList.add("d-none");
  document.getElementById("soundOn").classList.remove("d-none");
  sounds.forEach((sound) => {
    sound.muted = false;
  });
}
