let blueCarImage = createImg();
let greenCarImage = createImg();

let trackImages = [];

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
    { var: blueCarImage, fileName: 'blue_car.png'},
    { var: greenCarImage, fileName: 'green_car.png'},
    { trackType: TRACK_MAP.WALL, fileName: 'track_wall.png'},
    { trackType: TRACK_MAP.ROAD, fileName: 'track_road.png'},
    { trackType: TRACK_MAP.GOAL, fileName: 'track_goal.png'},
    { trackType: TRACK_MAP.TREE, fileName: 'track_tree.png'},
    { trackType: TRACK_MAP.FLAG, fileName: 'track_flag.png'}
  ];

  imagesToLoad = images.length;
  images.forEach(image => {
    if (image.trackType != undefined) {
      trackImages[image.trackType] = createImg();
      loadImage(trackImages[image.trackType], image.fileName);
    } else {
      loadImage(image.var, image.fileName);
    }
  });
}
