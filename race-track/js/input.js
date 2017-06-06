const onKeyDown = createKeyHandler(true);
const onKeyUp = createKeyHandler(false);

function setupInput(cars) {
  document.addEventListener('keydown', onKeyDown(cars));
  document.addEventListener('keyup', onKeyUp(cars));
}

function createKeyHandler(value) {
  return cars => {
    return ({ keyCode }) => {
      cars.forEach(handleEvent(keyCode));
    }
  };

  function handleEvent(keyCode) {
    return car => {
      switch(keyCode) {
        case car.keyBindings.left:
          car.keysPressed.left = value;
          break;
        case car.keyBindings.right:
          car.keysPressed.right = value;
          break;
        case car.keyBindings.up:
          car.keysPressed.gas = value;
          break;
        case car.keyBindings.down:
          car.keysPressed.reverse = value;
      }
    }
  }
}
