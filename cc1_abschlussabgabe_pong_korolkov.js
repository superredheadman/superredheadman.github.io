function setup() {
  var canvas = createCanvas(1000, 800);
  frameRate(30);
  canvas.parent("game");
}

var playerOneX = 20;
var playerOneY = 150;
var playerOneXsize = 20;
var playerOneYsize = 100;
var padcolor = 255;
var BallSpeed = 10;

var playerTwoX = 560;
var playerTwoY = 150;
var playerTwoXsize = 20;
var playerTwoYsize = 100;

var playerCpuX = 560;
var playerCpuY = 150;
var playerCpuXsize = 20;
var playerCpuYsize = 100;

var pOnePoints = 0;
var pTwoPoints = 0;
var cpuPoints = 0;
var Ballwechsel = 0;

var BallPx = fieldXsize / 2 + fieldX;
var BallPy = fieldYsize / 2 + fieldY;
var BallD = 15;
var BallXSpeed = BallSpeed;
var BallYSpeed = BallSpeed;

var fieldX = 200;
var fieldY = 100;
var fieldXsize = 600;
var fieldYsize = 400;

var onePlayerButtonX = 430;
var onePlayerButtonY = 440;
var onePlayerButtonXsize = 150;
var onePlayerButtonYsize = 50;

var twoPlayerButtonX = 430;
var twoPlayerButtonY = 500;
var twoPlayerButtonXsize = 150;
var twoPlayerButtonYsize = 50;

var highscoreButtonX = 430;
var highscoreButtonY = 560;
var highscoreButtonXsize = 150;
var highscoreButtonYsize = 50;

var resetButtonX = 450;
var resetButtonY = 700;
var resetButtonXsize = 150;
var resetButtonYsize = 50;

var backButtonX = 580;
var backButtonY = 650;
var backButtonXsize = 150;
var backButtonYsize = 50;

var controlButtonX = 430;
var controlButtonY = 620;
var controlButtonXsize = 150;
var controlButtonYsize = 50;

var screen = 1;

var opacity1;
var opacity2;
var opacity3;
var opacity4;

var r = 255;
var g = 255;
var b = 255;

var highscore1 = 0;
var highscore2 = 0;
var highscore3 = 0;
var highscoreList = ["0", "0", "0"];
var p1;
var p2;
var start;
var fieldscreen;
var paw1;
var paw2;
var highscore;
var yarn;
var control;

p1 = loadImage("img/p1.png");
p2 = loadImage("img/p2.png");
start = loadImage("img/startscreen.png");
fieldscreen = loadImage("img/field.png");
paw1 = loadImage("img/paw1.png");
paw2 = loadImage("img/paw2.png");
highscore = loadImage("img/highscore.png");
yarn = loadImage("img/ball.png");
control = loadImage("img/control.png");

function pointCounter() {
  textSize(20);
  fill(255);
  strokeWeight(1);
  text(pOnePoints, fieldX + 100, fieldY + 450);
  text(pTwoPoints, fieldX + 500, fieldY + 450);

  if (BallPx < 20 + fieldX) {
    pTwoPoints += 1;
  }
  if (BallPx > 580 + fieldX) {
    pOnePoints += 1;
  }
}

function pointsHighscore() {
  fill(255);
  text(Ballwechsel, fieldX + fieldXsize / 2, fieldY + fieldYsize + 50);

  if (BallPx < 20 + fieldX) {
    cpuPoints += 1;
  }
}

function field() {
  fill(255);
  image(fieldscreen, 0, 0, 1000, 800);
  rect(fieldX, fieldY, fieldXsize, fieldYsize, 30);
  stroke(0);
  strokeWeight(2);
}

//P1
function playerOne() {
  //movement
  fill(padcolor);
  image(
    p1,
    playerOneX + fieldX,
    playerOneY + fieldY,
    playerOneXsize,
    playerOneYsize
  );

  if (mouseIsPressed) {
    playerOneY = mouseY - fieldY * 1.5;
  }
  function moveOne() {
    //Up
    if (keyIsDown(87)) {
      playerOneY = playerOneY - 20;
    }
    //Down
    if (keyIsDown(83)) {
      playerOneY = playerOneY + 20;
      //Pad1 begrenzung
    }
    if (playerOneY > 300) {
      playerOneY = 300;
    }
    if (playerOneY < 0) {
      playerOneY = 0;
    }
  }

  if (
    BallPx > playerOneX - playerOneXsize + fieldX + BallD / 2 &&
    BallPx < playerOneX + playerOneXsize + fieldX + BallD / 2 &&
    BallPy < playerOneY + playerOneYsize + fieldY + BallD / 2 &&
    BallPy > playerOneY + fieldY + BallD / 2
  ) {
    Ballwechsel += 1;
  }

  moveOne();
}

//P2
function playerTwo() {
  //movement
  image(
    p2,
    playerTwoX + fieldX,
    playerTwoY + fieldY,
    playerTwoXsize,
    playerTwoYsize
  );

  function moveTwo() {
    //W up
    if (keyIsDown(38)) {
      playerTwoY = playerTwoY - 20;
    }
    //S down
    if (keyIsDown(40)) {
      playerTwoY = playerTwoY + 20;
    }
    //Pad2 begrenzung
    if (playerTwoY > 300) {
      playerTwoY = 300;
    }
    if (playerTwoY < 0) {
      playerTwoY = 0;
    }
  }
  moveTwo();
}

function playerCpu() {
  image(p2, playerCpuX + fieldX, BallPy - 50, playerCpuXsize, playerCpuYsize);
  if (
    BallPy < BallPy + playerCpuYsize &&
    BallPy > BallPy - playerCpuYsize &&
    BallPx > playerCpuX - playerCpuXsize + fieldX
  ) {
    BallXSpeed *= -1;
  }
  collision(playerCpuX, playerCpuY, playerCpuXsize, playerCpuYsize);
}

function ball() {
  noStroke();
  fill(0, 0, 0);

  ellipse(fieldXsize / 2 + fieldX, fieldYsize / 2 + fieldY, 20);
  image(yarn, BallPx - 15, BallPy - 15, 30, 30);

  //   Ball move
  BallPx = BallPx + BallXSpeed;
  BallPy = BallPy + BallYSpeed;

  if (
    BallPx < 0 + fieldX + BallD / 2.5 ||
    BallPx > fieldXsize + fieldX - BallD / 2.5
  ) {
    BallPx = fieldXsize / 2 + fieldX;
    BallPy = fieldYsize / 2 + fieldY;
    BallXSpeed *= -1;
  }

  if (
    BallPy < 10 + fieldY + BallD / 2.5 ||
    BallPy > 390 + fieldY - BallD / 2.5
  ) {
    BallYSpeed *= -1;
  }

  collision(playerOneX, playerOneY, playerOneXsize, playerOneYsize);
  collision(playerTwoX, playerTwoY, playerTwoXsize, playerTwoYsize);
}

function collision(BrettX, BrettY, BrettSizeX, BrettSizeY) {
  if (
    BallPx > BrettX - BrettSizeX + fieldX + BallD / 2 &&
    BallPx < BrettX + BrettSizeX + fieldX + BallD / 2 &&
    BallPy < BrettY + BrettSizeY + fieldY + BallD / 2 &&
    BallPy > BrettY + fieldY + BallD / 2
  ) {
    BallXSpeed *= -1;
    var pad = BallPy - fieldY - BrettY;
    if (pad > 45 && pad < 55) {
      BallSpeed *= -1;
    } else {
      if (BallSpeed < 0) {
        BallSpeed *= -1;
      } else {
        BallSpeed *= 1;
      }
    }
  }
}

function OnePlayerButton() {
  fill(r, g, b, opacity1);
  rect(
    onePlayerButtonX,
    onePlayerButtonY,
    onePlayerButtonXsize,
    onePlayerButtonYsize
  );
  fill(0);
  textSize(30);
  text(
    "  1 Paw",
    onePlayerButtonX + onePlayerButtonXsize / 10,
    onePlayerButtonY + onePlayerButtonYsize / 1.3
  );
  opacity1 = 100;
  if (
    mouseX > onePlayerButtonX &&
    mouseX < onePlayerButtonX + onePlayerButtonXsize &&
    mouseY > onePlayerButtonY &&
    mouseY < onePlayerButtonY + onePlayerButtonYsize
  ) {
    opacity1 = 255;
    if (mouseIsPressed) {
      opacity1 = 255;
      BallPx = fieldXsize / 2 + fieldX;
      BallPy = fieldYsize / 2 + fieldY;
      BallXSpeed = 10;
      BallYSpeed = 10;
      screen = 2;
    }
  }
}

function TwoPlayerButton() {
  fill(r, g, b, opacity2);
  rect(
    twoPlayerButtonX,
    twoPlayerButtonY,
    twoPlayerButtonXsize,
    twoPlayerButtonYsize
  );
  fill(0);
  textSize(30);
  text(
    "  2 Paw",
    twoPlayerButtonX + twoPlayerButtonXsize / 10,
    twoPlayerButtonY + twoPlayerButtonYsize / 1.3
  );
  opacity2 = 100;
  if (
    mouseX > twoPlayerButtonX &&
    mouseX < twoPlayerButtonX + twoPlayerButtonXsize &&
    mouseY > twoPlayerButtonY &&
    mouseY < twoPlayerButtonY + twoPlayerButtonYsize
  ) {
    opacity2 = 255;
    if (mouseIsPressed) {
      opacity2 = 255;
      BallPx = fieldXsize / 2 + fieldX;
      BallPy = fieldYsize / 2 + fieldY;
      BallXSpeed = 10;
      BallYSpeed = 10;
      screen = 3;
    }
  }
}

function highScoreButton() {
  fill(r, g, b, opacity3);
  rect(
    highscoreButtonX,
    highscoreButtonY,
    highscoreButtonXsize,
    highscoreButtonYsize
  );
  fill(0);
  textSize(30);
  text(
    "Highscore",
    highscoreButtonX + highscoreButtonXsize / 16,
    highscoreButtonY + highscoreButtonYsize / 1.3
  );
  opacity3 = 100;
  if (
    mouseX > highscoreButtonX &&
    mouseX < highscoreButtonX + highscoreButtonXsize &&
    mouseY > highscoreButtonY &&
    mouseY < highscoreButtonY + highscoreButtonYsize
  ) {
    opacity3 = 255;
    if (mouseIsPressed) {
      opacity3 = 255;
      screen = 4;
    }
  }
}

function controlButton() {
  fill(r, g, b, opacity4);
  rect(controlButtonX, controlButtonY, controlButtonXsize, controlButtonYsize);
  fill(0);
  textSize(23);
  text(
    "コントロール",
    controlButtonX + controlButtonXsize / 16,
    controlButtonY + controlButtonYsize / 1.3
  );
  opacity4 = 100;
  if (
    mouseX > controlButtonX &&
    mouseX < controlButtonX + controlButtonXsize &&
    mouseY > controlButtonY &&
    mouseY < controlButtonY + controlButtonYsize
  ) {
    opacity4 = 255;
    if (mouseIsPressed) {
      opacity4 = 255;
      screen = 7;
    }
  }
}

function resetButton() {
  fill(r, g, b, opacity2);
  rect(resetButtonX, resetButtonY, resetButtonXsize, resetButtonYsize);
  fill(0);
  textSize(30);
  text(
    "Meow",
    resetButtonX + resetButtonXsize / 4,
    resetButtonY + resetButtonYsize / 1.5
  );
  opacity2 = 100;
  if (
    mouseX > resetButtonX &&
    mouseX < resetButtonX + resetButtonXsize &&
    mouseY > resetButtonY &&
    mouseY < resetButtonY + resetButtonYsize
  ) {
    opacity2 = 255;
    if (mouseIsPressed) {
      opacity2 = 255;
      BallPx = fieldXsize / 2 + fieldX;
      BallPy = fieldYsize / 2 + fieldY;
      BallXSpeed = 10;
      BallYSpeed = 10;
      screen = 1;
      pOnePoints = 0;
      pTwoPoints = 0;
      Ballwechsel = 0;
      cpuPoints = 0;
    }
  }
}

function highscoreScreen() {
  fill(200, 0, 0);
  textSize(70);
  text(Ballwechsel, 630, 280);
  textSize(35);
  text(
    "1. " +
      highscoreList[0] +
      "\n2. " +
      highscoreList[1] +
      "\n3. " +
      highscoreList[2],
    630,
    460
  );

  if (Ballwechsel > highscoreList[0]) {
    highscoreList.unshift(Ballwechsel);
    highscore1 = 1;
  } else if (
    Ballwechsel > highscoreList[1] &&
    Ballwechsel <= highscoreList[0] &&
    highscore1 !== 1
  ) {
    highscoreList.splice(1, 0, Ballwechsel);
    highscore2 = 1;
  } else if (
    Ballwechsel > highscoreList[2] &&
    Ballwechsel <= highscoreList[0] &&
    Ballwechsel <= highscoreList[1] &&
    highscore1 !== 1 &&
    highscore2 !== 1
  ) {
    highscoreList.splice(2, 0, Ballwechsel);
    highscore3 = 1;
  }
}

function backButton() {
  fill(r, g, b, opacity2);
  rect(backButtonX, backButtonY, backButtonXsize, backButtonYsize);
  fill(0);
  textSize(30);
  text(
    "Meow",
    backButtonX + backButtonXsize / 10,
    backButtonY + resetButtonYsize / 1.5
  );
  opacity2 = 100;
  if (
    mouseX > backButtonX &&
    mouseX < backButtonX + backButtonXsize &&
    mouseY > backButtonY &&
    mouseY < backButtonY + backButtonYsize
  ) {
    opacity2 = 255;
    if (mouseIsPressed) {
      opacity2 = 255;
      screen = 1;
      pOnePoints = 0;
      pTwoPoints = 0;
      Ballwechsel = 0;
      cpuPoints = 0;
    }
  }
}

function winScreen() {
  if (cpuPoints > 0) {
    screen = 4;
  }
  if (pOnePoints === 9) {
    screen = 5;
  }
  if (pTwoPoints === 9) {
    screen = 6;
  }
}

function draw() {
  clear();

  //Startscreen
  if (screen === 1) {
    image(start, 0, 0, 1000, 800);
    OnePlayerButton();
    TwoPlayerButton();
    highScoreButton();
    controlButton();
    image(p1, mouseX - 50, mouseY - 20, 100, 400);
  }
  //1PvsCPU
  if (screen === 2) {
    field();
    playerOne();
    playerCpu();
    ball();
    pointsHighscore();
    resetButton();
    winScreen();
  }
  //2P
  if (screen === 3) {
    field();
    playerOne();
    playerTwo();
    ball();
    pointCounter();
    resetButton();
    winScreen();
  }

  if (screen === 4) {
    image(highscore, 0, 0, 1000, 800);
    highscoreScreen();
    backButton();
    image(p1, mouseX - 50, mouseY - 20, 100, 400);
  }
  if (screen === 5) {
    image(paw1, 0, 0, 1000, 800);
    backButton();
    image(p1, mouseX - 50, mouseY - 20, 100, 400);
  }
  if (screen === 6) {
    image(paw2, 0, 0, 1000, 800);
    backButton();
    image(p1, mouseX - 50, mouseY - 20, 100, 400);
  }
  if (screen === 7) {
    image(control, 0, 0, 1000, 800);
    backButton();
  }
}

//screen1 = Menü
//screen2 = P1 vs CPU
//screen3 = P1 vs P2
//screen4 = highscoreScreen
//screen5 = p1 win
//screen6 = p2 win
//screen7 =

// Highscrore
