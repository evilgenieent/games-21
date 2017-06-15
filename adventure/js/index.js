let cavas, canvasContext;

const warrior = new Warrior();

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
  warrior.setKeyBindings(KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT);
  setupInput(warrior);

  reloadGame();
}

function reloadGame() {
  setupLevel([ ...LEVEL_GRID ]);
  warrior.reset(warriorImage);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  warrior.move();
}

function drawAll() {
  drawLevel();
  warrior.draw();
}
