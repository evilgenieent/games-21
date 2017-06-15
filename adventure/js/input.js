const onKeyDown = createKeyHandler(true);
const onKeyUp = createKeyHandler(false);

function setupInput(element) {
  document.addEventListener('keydown', onKeyDown(element));
  document.addEventListener('keyup', onKeyUp(element));
}

function createKeyHandler(value) {
  return element => {
    return ({ keyCode }) => {
      handleEvent(keyCode, element);
    }
  };

  function handleEvent(keyCode, element) {
    switch(keyCode) {
      case element.keyBindings.left:
        element.keysPressed.left = value;
        break;
      case element.keyBindings.right:
        element.keysPressed.right = value;
        break;
      case element.keyBindings.up:
        element.keysPressed.up = value;
        break;
      case element.keyBindings.down:
        element.keysPressed.down = value;
    }
  }
}
