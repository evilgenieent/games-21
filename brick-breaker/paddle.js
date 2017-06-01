function Paddle({ x = 0, y = 0, width, height }) {
  let speedX = 5;

  const halfWidth = _ => width / 2;
  const getEdges = _ => ({
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
  });

  return {
    get width() {
      return width;
    },
    
    get height() {
      return height;
    },

    set x(value) {
      x = value;
    },

    get x() {
      return x;
    },

    set y(value) {
      y = value;
    },

    get y() {
      return y;
    },

    get centerX() {
      return x + halfWidth();
    },

    set centerX(value) {
      x = value - halfWidth();
    },

    getDistFromCenterX(value) {
      return value - this.centerX;
    },

    isCoordWithinPaddle(x, y) {
      const edges = getEdges();
      return x > edges.left && 
             x < edges.right &&
             y > edges.top && 
            y < edges.bottom;
    },

    moveX() {
      x += speedX;
    }
  }
}
