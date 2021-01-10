var factor = 0;
var infectionColoring;

function setup() {
    var canvas = createCanvas(windowWidth * 0.5, windowHeight * 0.5, WEBGL);
    //var canvas = document.getElementById("game");
    canvas.parent('gameZone');
    canvas.style('display', 'block');
    document.getElementsByTagName("canvas")[0].id = "game"
    frameRate(60);
    factor = windowWidth / windowHeight;

    infectionColoring = createGraphics(width, height, WEBGL);
    infectionColoring.hide();

    imageMode(CENTER);
    changeGameState(2);

    masterVolume(0);

    themeSong.forEach(song => {
        song.setVolume(0.2);
    });
}

// Array de gameStates
var gameState = 0;
var gameStates = [];
var gameStateSetups = [];

function changeGameState(newState) {
    gameState = newState;
    gameStateSetups[newState]();
}

function draw() { // Bucle principal
    if (!focused && gameState != 2)
        return;
    scale(width, height);
    // infectionColoring.scale(width, height);
    translate(-0.5, -0.5); // Normalización de los ejes
    // infectionColoring.translate(0.5, 0.5);
    gameStates[gameState]();
}