const LEVEL_WIDTH = 40;
const LEVEL_HEIGHT = 40;
const LEVEL_COLS = 20;
const LEVEL_ROWS = 15;

const LEVEL_MAP = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  DOOR: 3,
};

const LEVEL_GRID = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 3, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1,
  1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

let levelGrid = [];

function setupLevel(level) {
  levelGrid = createLavelGrid(level);
}

function isColRowWithinGrid(col, row) {
  return col >= 0 && col < LEVEL_COLS && row >= 0 && row < LEVEL_ROWS;
}

function tileTypeAtColRow(col, row) {
  return isColRowWithinGrid(col, row)
    ? levelGrid[calcLevelIndexFromColAndRow(col, row)].value
    : LEVEL_MAP.WALL;
}

function calcLevelIndexFromColAndRow(col, row) {
  return col + LEVEL_COLS * row;
}

function handleWarriorWallInteraction(warrior) {
  const warriorLevelCol = Math.floor(warrior.x / LEVEL_WIDTH);
  const warriorLevelRow = Math.floor(warrior.y / LEVEL_HEIGHT);

  const tileType = tileTypeAtColRow(warriorLevelCol, warriorLevelRow);

  switch (tileType) {
    // case LEVEL_MAP.ROAD:
    //   console.log('ON ROAD');
    //   warrior.stop();
    //   break;
    case LEVEL_MAP.WALL:
      console.log('HIT WALL');
      warrior.stop();
      break;
    case LEVEL_MAP.DOOR:
      console.log('AT DOOR');
      warrior.stop();
      break;
  }
}

function calcColAndRowFromIndex(index) {
  return {
    row: Math.floor(index / LEVEL_COLS),
    col: index % LEVEL_COLS,
  };
}

function createLavelGrid(gridLayout) {
  return gridLayout.map((value, index) => {
    const { row, col } = calcColAndRowFromIndex(index);
    return {
      col,
      row,
      value,
      x: LEVEL_WIDTH * col,
      y: LEVEL_HEIGHT * row,
      width: LEVEL_WIDTH,
      height: LEVEL_HEIGHT,
      image: getImageForTile(value),
    };
  });
}

function getImageForTile(value) {
  // Default to Level Road if no image is found. This basically
  // cover the case where the player start position is.
  return gameImages[value] || gameImages[LEVEL_MAP.ROAD];
}

function drawLevel() {
  levelGrid.forEach(drawTile);
}

function drawTile(tile) {
  canvasContext.drawImage(tile.image, tile.x, tile.y, tile.width, tile.height);
}
