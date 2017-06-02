function Ball(x = 0, y = 0, radius = 10) {
  let speedX = 5;
  let speedY = 7;

  return {
    get x() {
      return x;
    },

    get y() {
      return y;
    },

    get radius() {
      return radius;
    },

    set speedX(value) {
      speedX = value;
    },

    set speedY(value) {
      speedY = value;
    },

    get speedX() {
      return speedX;
    },

    get speedY() {
      return speedY;
    },

    get previousX() {
      return x - speedX;
    },

    get previousY() {
      return y - speedY;
    },

    reverseSpeedX() {
      speedX *= -1;
    },

    reverseSpeedY() {
      speedY *= -1;
    },

    move(xValue, yValue) {
      x = xValue;
      y = yValue;
    },

    moveX() {
      x += speedX;
    },

    moveY() {
      y += speedY;
    }
  }
};
