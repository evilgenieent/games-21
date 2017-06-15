const WALKING_SPEED = 4;

class Warrior {
  constructor() {
    this.x = 0;
    this.y = 100;
    this.speed = 0;

    this.keysPressed = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  setKeyBindings(up, down, left, right) {
    this.keyBindings = {
      up,
      down,
      left,
      right,
    };
  }

  draw() {
    drawBitmapCentered(this.image, this.x, this.y);
  }

  move() {
    if (this.keysPressed.up) {
      this.y += -WALKING_SPEED;
    }
    if (this.keysPressed.down) {
      this.y += WALKING_SPEED;
    }
    if (this.keysPressed.right) {
      this.x += WALKING_SPEED;
    }
    if (this.keysPressed.left) {
      this.x += -WALKING_SPEED;
    }

    handleWarriorWallInteraction(this);
  }

  reset(image) {
    this.image = image;

    const warrioStartTile = levelGrid.find(tile => tile.value === LEVEL_MAP.PLAYER_START)
    if (warrioStartTile) {
      warrioStartTile.value = LEVEL_MAP.ROAD;
      this.x = warrioStartTile.col * LEVEL_WIDTH + LEVEL_WIDTH/2;
      this.y = warrioStartTile.row * LEVEL_HEIGHT + LEVEL_HEIGHT/2;
    } else {
      console.error('No player start found!');
    }
  }

  stop() {
    console.log('STOP!');
    // this.x -= WALKING_SPEED;
    // this.y -= WALKING_SPEED;
  }
}
