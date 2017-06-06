const GROUND_SPEED_DECAY = 0.97;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_TURN_SPEED = 0.5;

class Car {
  constructor() {
    this.x = 0;
    this.y = 100;
    this.speed = 0;
    this.angle = 0;
    this.name = 'Car With No Name';
    this.won = false;

    this.keysPressed = {
      gas: false,
      reverse: false,
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

  draw(carImage) {
    drawBitmapCenteredWithRotation(this.image, this.x, this.y, this.angle);
  }

  move() {
    this.speed *= GROUND_SPEED_DECAY;

    if (this.keysPressed.gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keysPressed.reverse) {
      this.speed += -REVERSE_POWER;
    }
    if (Math.abs(this.speed) > MIN_TURN_SPEED) {
      if (this.keysPressed.right) {
        this.angle += TURN_RATE;
      }
      if (this.keysPressed.left) {
        this.angle += -TURN_RATE;
      }
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    handleCarTrackInteraction(this);
  }

  reset(image, name) {
    this.image = image;
    this.name = name;
    this.speed = 0;
    this.won = false;

    const carStartTile = trackGrid.find(track => track.value === TRACK_MAP.PLAYER_START)
    if (carStartTile) {
      carStartTile.value = TRACK_MAP.ROAD;
      this.angle = -Math.PI/2;
      this.x = carStartTile.col * TRACK_WIDTH + TRACK_WIDTH/2;
      this.y = carStartTile.row * TRACK_HEIGHT + TRACK_HEIGHT/2;
    } else {
      console.error('No player start found!');
    }
  }

  setAsWinner() {
    this.won = true;
  }

  reverse() {
    this.speed *= -0.5;
  }
}
