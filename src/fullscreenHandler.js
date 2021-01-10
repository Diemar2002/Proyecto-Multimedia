// fullscreen handler
var factor;
let onFullScreen;

function fullScreen() {
    onFullScreen = true;
    resizeCanvas(window.innerWidth, window.innerHeight);
    setTimeout(() => {window.location.href = "#game"; document.body.style = "overflow:hidden;"}, 100);
  }
  
  function keyPressed() {
    switch (keyCode) {
      case 27: // Escape
        if (onFullScreen) {
          onFullScreen = false;
          resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
          infectionColoring.resizeCanvas(width, height);
          document.body.style = "";
        }
        break;
    } 
  }
  
  function windowResized() {
    if (onFullScreen) {
      resizeCanvas(windowWidth, windowHeight);
      setTimeout(() => {window.location.href = "#game";}, 100);
    }
    else {
      resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
    }
    infectionColoring.resizeCanvas(width, height);
  
    factor = windowWidth / windowHeight;
  }

function doubleClicked() {
  if (onFullScreen) {
    onFullScreen = false;
    resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
    infectionColoring.resizeCanvas(width, height);
    document.body.style = "";
  }
}