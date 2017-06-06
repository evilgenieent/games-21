const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

const TRACK_MAP = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  TREE: 4,
  FLAG: 5,
};

const TRACK_GRID = [
  4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
  4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4,
];

let trackGrid = [];

function setupTrack(track) {
  trackGrid = createTrackGrid(track);
}

function isColRowWithinGrid(col, row) {
  return col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS;
}

function tileTypeAtColRow(col, row) {
  return isColRowWithinGrid(col, row)
    ? trackGrid[calcTrackIndexFromColAndRow(col, row)].value
    : TRACK_MAP.WALL;
}

function calcTrackIndexFromColAndRow(col, row) {
  return col + TRACK_COLS * row;
}

function handleCarTrackInteraction(car) {
  const carTrackCol = Math.floor(car.x / TRACK_WIDTH);
  const carTrackRow = Math.floor(car.y / TRACK_HEIGHT);

  const tile = tileTypeAtColRow(carTrackCol, carTrackRow);

  if (tile === TRACK_MAP.GOAL) {
    car.setAsWinner();
  } else if (tile !== TRACK_MAP.ROAD) {
    // Fixes the car getting stuck in the wall
    car.x -= Math.cos(car.angle) * car.speed;
    car.y -= Math.sin(car.angle) * car.speed;

    car.reverse();
  }
}

function calcColAndRowFromIndex(index) {
  return {
    row: Math.floor(index / TRACK_COLS),
    col: index % TRACK_COLS,
  };
}

function createTrackGrid(gridLayout) {
  return gridLayout.map((value, index) => {
    const { row, col } = calcColAndRowFromIndex(index);
    return {
      col,
      row,
      value,
      x: TRACK_WIDTH * col,
      y: TRACK_HEIGHT * row,
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      image: getImageForTile(value),
    };
  });
}

function getImageForTile(value) {
  // Default to Track Road if no image is found. This basically
  // cover the case where the player car start position is.
  return trackImages[value] || trackImages[TRACK_MAP.ROAD];
}

function drawTrack() {
  trackGrid.forEach(drawTrackPiece);
}

function drawTrackPiece(track) {
  canvasContext.drawImage(track.image, track.x, track.y, track.width, track.height);
}
