function Mouse(canvas) {
  const rect = canvas.rect;
  const root = document.documentElement;
  let x = 0;
  let y = 0;

  return {
    onMove(event) {
      x = event.clientX - rect.left - root.scrollLeft;
      y = event.clientY - rect.top - root.scrollTop;
    },

    get position() {
      return { x, y };
    },

    get x() {
      return x;
    },

    get y() {
      return y;
    },
  };
}
