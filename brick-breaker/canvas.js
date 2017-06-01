function Canvas(id) {
  const canvas = document.getElementById(id);
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  return Object.assign(canvas, {
    get context() {
      return context;
    },
    
    get centerX() {
      return centerX;
    },

    get centerY() {
      return centerY;
    },

    get rect() {
      return canvas.getBoundingClientRect();
    }
  });
}
