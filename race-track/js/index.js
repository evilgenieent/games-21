let cavas, canvasContext;

const blueCar = new Car();
const greenCar = new Car();
const cars = [
  blueCar,
  greenCar,
];

window.addEventListener('load', onLoad);

function onLoad() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setLoadingText();
  loadImages();
}

function setLoadingText() {
  drawText('Game Loading...', canvas.width/2, canvas.height/2, '#adacac', 24);
}

function startGame() {
  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  // Setup the key bindings and input handling
  blueCar.setKeyBindings(KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT);
  greenCar.setKeyBindings(KEYS.W, KEYS.S, KEYS.A, KEYS.D);
  setupInput([blueCar, greenCar]);

  reloadGame();
}

function showWinner(winningCar) {
  const { width, height } = canvas;
  const centerWidth = width / 2;
  const centerHeight = height / 2;

  drawRect(0, 0, width, height, COLORS.WHITE);
  drawText(`${winningCar.name} Wins!!`, centerWidth, centerHeight, COLORS.BLACK, 30);
  drawText(`Click to play again.`, centerWidth, centerHeight + 25, COLORS.GREY, 16);

  canvas.addEventListener('click', reloadGame, {
   once: true,
  });
}

function getWinner() {
  return cars.find(car => car.won);
}

function reloadGame() {
  setupTrack([ ...TRACK_GRID ]);
  blueCar.reset(blueCarImage, 'Blue Storm');
  greenCar.reset(greenCarImage, 'Green Machine');
}

function updateAll() {
  const winner = getWinner();

  if (winner) {
    showWinner(winner)
  } else {
    moveAll();
    drawAll();
  }
}

function moveAll() {
  blueCar.move();
  greenCar.move();
}

function drawAll() {
  drawTrack();
  blueCar.draw();
  greenCar.draw();
}
