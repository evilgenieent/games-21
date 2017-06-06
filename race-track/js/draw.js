function drawBitmapCenteredWithRotation(bitmap, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x, y);
  canvasContext.rotate(angle);
  canvasContext.drawImage(bitmap, -bitmap.width/2, -bitmap.height/2);
  canvasContext.restore();
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawText(text, textX, textY, color, fontSize = 12) {
  canvasContext.font = `normal ${fontSize}pt Calibri`;
  canvasContext.fillStyle = color;
  canvasContext.textAlign="center";
  canvasContext.fillText(text, textX, textY);
}