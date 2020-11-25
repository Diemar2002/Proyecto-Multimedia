var CONTAGIADOSINICIALES = 50;

var onFullScreen = false;

var poblacionTotal = 0;

var primeraProvincia = 0;

var ccp = 2;

var economia = new StatusBar(0, 100, 100, new Color(255, 0, 0), new p5.Vector(50, 48));
var felicidad = new StatusBar(0, 100, 100, new Color(0, 255, 0), new p5.Vector(50, 50));
var contagiados = new StatusBar(0, 100, 0, new Color(0, 0, 255), new p5.Vector(50, 52));

var iconosFelicidad = new Array();
var iconoDinero;
var iconoCorona;

function setup() {
  var canvas = createCanvas(windowWidth * 0.5, windowHeight * 0.5);
  canvas.parent('gameZone');
  canvas.style('display', 'block');

  provincias.forEach(provincia => {
    poblacionTotal += provincia.population;
  });

  primeraProvincia = provincias[int(Math.random() * 51)];
  primeraProvincia.contagios = CONTAGIADOSINICIALES;

  iconosFelicidad.push(loadImage('assets/enfadado.png'));
  iconosFelicidad.push(loadImage('assets/serio.png'));
  iconosFelicidad.push(loadImage('assets/feliz.png'));
  iconoDinero = loadImage('assets/dinero.png');
  iconoCorona = loadImage('assets/corona 2.png');
}

// fullscreen handler

function fullScreen() {
  onFullScreen = true;
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  switch (keyCode) {
    case 27: // Escape
      if (onFullScreen) {
        onFullScreen = false;
        resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
      }
  } 
}

function windowResized() {
  if (onFullScreen)
    resizeCanvas(windowWidth, windowHeight);
  else
    resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
}
