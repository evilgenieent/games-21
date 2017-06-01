function Brick({ index, x, y, width, height, color, row, col }) {
  let visible = true;
  
  return {
    get color() {
      return color;
    },

    get index() {
      return index;
    },

    get x() {
      return x;
    },

    get y() {
      return y;
    },

    get row() {
      return row;
    },

    get col() {
      return col;
    },

    get width() {
      return width;
    },

    get height() {
      return height;
    },

    get visible() {
      return visible;
    },

    show() {
      visible = true;
    },

    hide() {
      visible = false;
    },
  }
}
