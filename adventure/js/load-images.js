let warriorImage = createImg();

let gameImages = [];

// This gets set automatically in loadImages()
let imagesToLoad = 0;

function createImg() {
  return document.createElement('img');
}

function onImageLoad() {
  imagesToLoad--;
  if (allImagesLoaded()) {
    startGame();
  }
}

function loadImage(image, fileName) {
    image.src = `images/${fileName}`;
    image.addEventListener('load', onImageLoad);
}

function allImagesLoaded() {
  return imagesToLoad < 1;
}

function loadImages() {
  const images = [
    { var: warriorImage, fileName: 'blue_car.png'},
    { type: LEVEL_MAP.WALL, fileName: 'brick.png'},
    { type: LEVEL_MAP.ROAD, fileName: 'road.png'},
    { type: LEVEL_MAP.DOOR, fileName: 'door.png'},
  ];

  imagesToLoad = images.length;
  images.forEach(image => {
    if (image.type !== undefined) {
      gameImages[image.type] = createImg();
      loadImage(gameImages[image.type], image.fileName);
    } else {
      loadImage(image.var, image.fileName);
    }
  });
}
