let canvas, paddle, mouse, bricksLeft;

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_FROM_EDGE = 60;

const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const BRICK_Y_OFFSET = 100;

const calcColAndRowFromIndex = calcColAndRowFromIndexByColumns(BRICK_COLS);
const ball = Ball(0, 100, 10);
const brickList = createBrickList(BRICK_COLS * BRICK_ROWS);

window.addEventListener('load', onLoad);

function onLoad() {
  canvas = Canvas('gameCanvas');
  mouse = Mouse(canvas);
  paddle = Paddle({
    x: 250,
    y: canvas.height - PADDLE_DIST_FROM_EDGE,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  });

  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', onMouseMove);
  brickReset();
}

function isGutterRow(row) {
  return row < 3;
}

function onMouseMove(event) {
  mouse.onMove(event);
  paddle.centerX = mouse.position.x;
  
  // Cheat for testing
  // ball.move(mouse.position.x, mouse.position.y);  
  // ball.speedX = 0;
  // ball.speedY = -4;
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveBall() {
  ball.moveX();
  ball.moveY();

  // Left
  if (ball.x < 0) {
    ball.reverseSpeedX();
  }

  // Right
  if (ball.x > canvas.width) {
    ball.reverseSpeedX();
  }

  // Top
  if (ball.y < 0) {
    ball.reverseSpeedY();
  }

  // Bottom
  if (ball.y > canvas.height) {
    ballReset();
  }
}

function ballReset() {
  ball.move(canvas.centerX, canvas.centerY);
}

function brickReset() {
  bricksLeft = 0;
  brickList.forEach(brick => {
    if (isGutterRow(brick.row)) {
      brick.hide();
    } else {
      brick.show();
      bricksLeft++;
    }
  });
}

function isBrickVisible(brick) {
  return brick && brick.visible;
}

function handleBallBrickInteraction() {
  const ballBrickCol = Math.floor(ball.x / BRICK_WIDTH);
  const ballBrickRow = Math.floor(ball.y / BRICK_HEIGHT);
  const brickIndexUnderBall = calcBrickIndexFromColAndRow(
    ballBrickCol,
    ballBrickRow,
  );
  const brick = brickList[brickIndexUnderBall];

  if (
    ballBrickCol >= 0 &&
    ballBrickCol < BRICK_COLS &&
    ballBrickRow >= 0 &&
    ballBrickRow < BRICK_ROWS
  ) {
    if (brick.visible) {
      brick.hide();
      bricksLeft--;
      
      let bothTestsFailed = true;
      const previousBrickCol = Math.floor(ball.previousX / BRICK_WIDTH);
      const previousBrickRow = Math.floor(ball.previousY / BRICK_HEIGHT);

      // Side collision
      if (ballBrickCol !== previousBrickCol) {
        const adjBrickSide = calcBrickIndexFromColAndRow(previousBrickCol, ballBrickRow);
        const adjBrick = brickList[adjBrickSide];
        if (!isBrickVisible(adjBrick)) {
          ball.reverseSpeedX();
          bothTestsFailed = false;
        }
      }

      // Top / Bottom collision
      if (ballBrickRow !== previousBrickRow) {
        const adjBrickTopBottomIndex = calcBrickIndexFromColAndRow(ballBrickCol, previousBrickRow);
        const adjBrick = brickList[adjBrickTopBottomIndex];
        if (!isBrickVisible(adjBrick)) {
          ball.reverseSpeedY();
          bothTestsFailed = false;
        }
      }

      // Armpit collision
      if (bothTestsFailed) {
        ball.reverseSpeedX();
        ball.reverseSpeedY();
      }
    }
  }
}

function handleBallPaddleInteraction() {
  if (paddle.isCoordWithinPaddle(ball.x, ball.y)) {
    ball.reverseSpeedY();
    ball.speedX = paddle.getDistFromCenterX(ball.x) * 0.35;
  }
}

function moveAll() {
  moveBall();
  handleBallBrickInteraction();
  handleBallPaddleInteraction();
}

function calcColAndRowFromIndexByColumns(columnCount) {
  return index => ({
    row: Math.floor(index / columnCount),
    col: index % columnCount,
  });
}

function createBrickList(count) {
  return Utils.range(0, count, index => {
    const { row, col } = calcColAndRowFromIndex(index);
    return Brick({
      index,
      col,
      row,
      x: BRICK_WIDTH * col,
      y: BRICK_HEIGHT * row,
      width: BRICK_WIDTH - BRICK_GAP,
      height: BRICK_HEIGHT - BRICK_GAP,
      color: COLORS.BLUE,
    });
  });
}

function calcBrickIndexFromColAndRow(col, row) {
  return col + BRICK_COLS * row;
}

function drawBrickIfVisible(brick) {
  if (brick.visible) {
    drawRect(brick.x, brick.y, brick.width, brick.height, brick.color);
  }
}

function drawAll() {
  blankScreen();
  drawCircle(ball.x, ball.y, ball.radius, COLORS.WHITE);
  drawRect(paddle.x, paddle.y, paddle.width, paddle.height, COLORS.WHITE);

  brickList.forEach(drawBrickIfVisible);

  drawText(`Bricks Left: ${bricksLeft}`, 10, 20, COLORS.WHITE);

  // Just for debugging
  // const mouseBrickCol = Math.floor(mouse.x / BRICK_WIDTH);
  // const mouseBrickRow = Math.floor(mouse.y / BRICK_HEIGHT);
  // const brickIndex = calcBrickIndexFromColAndRow(mouseBrickCol, mouseBrickRow);
}

function blankScreen() {
  drawRect(0, 0, canvas.width, canvas.height, COLORS.BLACK);
}

function drawCircle(centerX, centerY, radius, color) {
  const { context } = canvas;
  context.fillStyle = color;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();
}

function drawRect(leftX, topY, width, height, color) {
  const { context } = canvas;
  context.fillStyle = color;
  context.fillRect(leftX, topY, width, height);
}

function drawText(text, textX, textY, color, fontSize = 12) {
  const { context } = canvas;
  context.font = `normal ${fontSize}pt Calibri`;
  context.fillStyle = color;
  context.fillText(text, textX, textY);
}
