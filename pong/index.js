const COLORS = {
  WHITE: 'white',
  BLACK: 'black',
};

let canvas;
let context;

let canvasXCenter;
let canvasYCenter;

let ballX = 10;
let ballY = 10;
let ballSpeedX = 15;
let ballSpeedY = 4;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
let paddleLY = 250;
let paddleRY = 250;

const WINNING_SCORE = 3;
let scores = {
  player1: 0,
  player2: 0,
};

let showingWinScreen = false;

window.addEventListener('load', onLoad);

function resetScores() {
  scores.player1 = 0;
  scores.player2 = 0;
}

function showWinScreen() {
  showingWinScreen = true;
}

function hideWinScreen() {
  showingWinScreen = false;
}

function drawWinScreen() {
  blankScreen();
  context.fillStyle = COLORS.WHITE;
  context.textAlign = "center";

  let winningPlayer = 'Player 1';
  if (scores.player2 == WINNING_SCORE) {
    winningPlayer = 'Player 2';
  }

  context.font = 'normal 30pt Calibri';
  context.fillText(
    `${winningPlayer} Won!`,
    canvasXCenter,
    canvasYCenter,
  );

  context.font = 'italic 15pt Calibri';
  context.fillText(
    'Click to start a new game',
    canvasXCenter,
    canvasYCenter + 20,
  );
}

function onLoad() {
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');

  canvasXCenter = canvas.width / 2;
  canvasYCenter = canvas.height / 2;

  const framePerSecond = 30;
  setInterval(() => {
    if (!showingWinScreen) {
      moveEverything();
      drawEverything();
    } else {
      showWinScreen();
      drawWinScreen();
    }
  }, 1000 / framePerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', event => {
    const mousePos = getMousePos(event);
    paddleLY = mousePos.y - PADDLE_HEIGHT / 2;
  });
}

function handleMouseClick(event) {
  if (showingWinScreen) {
    resetScores();
    hideWinScreen();
  }
}

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  return {
    x: event.clientX - rect.left - root.scrollLeft,
    y: event.clientY - rect.top - root.scrollTop,
  };
}

function ballReset() {
  if (scores.player1 >= WINNING_SCORE || scores.player2 >= WINNING_SCORE) {
    showWinScreen();
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvasXCenter;
  ballY = canvasYCenter;
}

function computerMovement() {
  let paddleRYCenter = paddleRY + PADDLE_HEIGHT / 2;

  if (paddleRYCenter < ballY - 35) {
    paddleRY += 6;
  } else if (paddleRYCenter > ballY + 35) {
    paddleRY -= 6;
  }
}

function moveEverything() {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Left side
  if (ballX < 0) {
    if (ballY > paddleLY && ballY < paddleLY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      // Add a little extra ball control
      // Hitting the ball on the edges returns the ball
      // at a bit of a steeper angle than hitting it in
      // the center.
      const deltaY = ballY - (paddleLY + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      // Must score before ballReset()
      scores.player2++;
      ballReset();
    }
  }

  // Right Side
  if (ballX > canvas.width) {
    if (ballY > paddleRY && ballY < paddleRY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      // Add a little extra ball control
      // Hitting the ball on the edges returns the ball
      // at a bit of a steeper angle than hitting it in
      // the center.
      const deltaY = ballY - (paddleRY + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      // Must score before ballReset()
      scores.player1++;
      ballReset();
    }
  }
}

function blankScreen() {
  drawRect(0, 0, canvas.width, canvas.height, COLORS.BLACK);
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, COLORS.WHITE);
  }
}

function drawEverything() {
  // Blank out the entire canvas with black
  blankScreen();

  // Net
  drawNet();

  // Left paddle
  drawRect(0, paddleLY, PADDLE_WIDTH, PADDLE_HEIGHT, COLORS.WHITE);

  // Right paddle
  drawRect(
    canvas.width - PADDLE_WIDTH,
    paddleRY,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    COLORS.WHITE,
  );

  // Ball
  drawCircle(ballX, ballY, 10, COLORS.WHITE);

  // Scores
  context.textAlign = "center";
  context.font = 'normal 15pt Calibri';
  context.fillText('Player 1', 100, 50);
  context.fillText(scores.player1, 100, 75);
  context.fillText('Player 2', canvas.width - 200, 50);
  context.fillText(scores.player2, canvas.width - 200, 75);
}

function drawCircle(centerX, centerY, radius, drawColor) {
  context.fillStyle = drawColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();
}

function drawRect(leftX, topY, width, height, drawColor) {
  context.fillStyle = drawColor;
  context.fillRect(leftX, topY, width, height);
}
