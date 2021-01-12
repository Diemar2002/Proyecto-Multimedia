var economia = new StatusBar(0, 100, 100, new Color(63, 213, 63), new p5.Vector(0.081, 0.204), new p5.Vector(0.23, 0.204));
var felicidad = new StatusBar(0, 100, 100, new Color(255, 255, 57), new p5.Vector(0.081, 0.328), new p5.Vector(0.23, 0.328));
var contagiados = new StatusBar(0, 100, 0, new Color(171, 9, 153), new p5.Vector(0.081, 0.08), new p5.Vector(0.23, 0.08));

var microState = 0;
var prevMicroState = -1;
var prevCardShown = -1;
var timer = 0;
var prevSim = 0;
var starter;

var endCause = -1;

// Variables específicas a los modos
// Modo 1
const deltaStep = 7 // Días para que salgan nuevas opciones
const deltaCard = 0.25;
const deltaSim = 6 / deltaStep;
// const deltaSim = 0.1;

gameStateSetups[1] = () => {
    availableCards.length = 0;
    microState = 0;
    timer = 0;

    // Restablecer los contagios y contagiar una provincia
    provincias.forEach(provincia => {
        provincia.contagios.fill(0);
        provincia.totalContagios = 0;
        provincia.confinada = false;
        provincia.maskUsage = 0;
        provincia.deaths = 0;
        provincia.recovered = [0, 0, 0];
        provincia.deathRate = 0.03;
        // Parámetros para las cartas
        provincia.quarantineStreak = 0;

        provincia.totalRecovered = 0;
        
        provincia.locked = false;

    });
    totalContagios = 0;
    totalRecovered = 0;
    endCause = -1;
    day = 0;
    vaccineProgress = 0;
    // Restablecer las flags
    flag_investingOnVaccine = false;
    flag_vaccinating = [false, false, false];
    flag_fronteras = false;
    flag_reuniones = false;
    flag_toquedequeda = false;
    flag_comercios = [false, false, false];
    globalLockdown = false;
    canVaccinate = [true, true, true];
    

    economia.value = 100;
    economia.valueDisplayed = economia.value;
    felicidad.value = 100;
    felicidad.valueDisplayed = felicidad.value;
    contagiados.value = 0;
    contagiados.valueDisplayed = contagiados.value;

    starter = provincias[Math.floor(random(52))];
    starter.contagios[0] = 2;
    // ---------------------------------------------------

    sounds.forEach(sound => {
        sound.stop();
    });
    themeSong.forEach(song => {
        song.stop();
    });

    // Inicialización del tema principal
    if (!(themeSong[0]._playing || themeSong[1]._playing || themeSong[2]._playing) && playMusic) {
        themeSong[0].play();
        themeSong[0].onended(() => {themeSong[1].loop();})
    }
}

var availableCards = new Array();

gameStates[1] = () => { // Juego Principal¡
    timer += deltaTime / 1000;

    background(30, 27, 53);
    fill(255, 255, 255);

    // Renderizado del mapa
    imageMode(CENTER);
    image(mainMap, 0.5, 0.5, 1 / factor * mainMap.width / mainMap.height, 1);

    // Dibujado de los puntos en las provincias
    // shader(infectionsDisplayer);
    infectionColoring.imageMode(CENTER);
    provinceMaps.forEach((provincia, index) => {
        let perc = (provincias[index].totalContagios / provincias[index].population) * 255;
        let recp = (sq((provincias[index].totalRecovered + provincias[index].deaths)) / provincias[index].population) * 255;
        infectionColoring.tint(perc, 255, recp);
        infectionColoring.image(provincia, 0, 0, infectionColoring.width / factor * provincia.width / provincia.height, infectionColoring.height);
    });
    
    infectionsDisplayer.setUniform("texture", infectionColoring);
    infectionsDisplayer.setUniform("factor", factor);
    shader(infectionsDisplayer);
    fill(0, 0, 0, 0);
    rect(0, 0, 1, 1);
    resetShader();

    if (prevMicroState != microState) {
        prevMicroState = microState;
        switch (microState) {
            case 0:
                timer = 0;
                prevSim = 0;
                break;
            case 1: { // Carga de las cartas disponibles
                timer = 0;
                prevCardShown = -1;
                availableCards.forEach((card, index) => {
                    card.order = availableCards.length - index - 1;
                });
                m1_currentCardShown = 0;
            }
        }
    }

    switch (microState) {
        case 0: { // Modo de simulación
            let sim = Math.floor(timer / deltaSim);
            if (prevSim != sim) {
                prevSim = sim;
                simulationStep();
            }
            if (sim >= deltaStep) { // Han pasado los días
                microState = 1; // Se pasa al modo cartas
                updateCards();
            }
            break;
        } case 1: { // Modo de cartas
            if (availableCards.length == 0)
                break;
            let cardToShow = Math.floor(timer / deltaCard);
            if (cardToShow < availableCards.length) {
                if (prevCardShown != cardToShow) {
                    availableCards[cardToShow].mode = 1;
                    sounds[1].play();
                }
                prevCardShown = cardToShow;
            }

            for (i = availableCards.length - 1; i >= 0; i--) {
                availableCards[i].update();
                if (!availableCards[i].alive) {
                    availableCards.splice(i, 1);
                    if (availableCards.length == 0) {
                        microState = 0;
                        break;
                    }
                    availableCards.forEach((card, index) => {
                        card.order = availableCards.length - index - 1;
                    });
                }
            }
            for (i = 0; i < availableCards.length; i++)
                availableCards[i].render();
        }
    }

    // image(infectionColoring, 0.5, 0.5, 1, 1);
    // Actualización de las barras de estado
    contagiados.value = totalContagios / totalPopulation * 100;

    economia.update();
    felicidad.update();
    contagiados.update();

    // Renderizado de las barras de estado
    economia.render();
    felicidad.render();
    contagiados.render();
    noStroke();
    blendMode(REMOVE);
    blendMode(BLEND);
    fill(189, 195, 199);
    image(icons[7], 0.0507, economia.startPosition.y, 0.117 / factor, 0.117 , 0.117);
    image(icons[7], 0.0507, felicidad.startPosition.y, 0.117 / factor, 0.117 , 0.117);
    image(icons[7], 0.0507, contagiados.startPosition.y, 0.117 / factor, 0.117 , 0.117);
    // Dibujado de los iconos
    rectMode(CORNER);
    const iconsSize = 0.06;
    image(icons[1], 0.0507, economia.startPosition.y, iconsSize / factor * icons[1].width / icons[1].height, iconsSize);
    image(icons[0], 0.0507, contagiados.startPosition.y, iconsSize / factor * icons[1].width / icons[1].height, iconsSize);
    let indiceFelicidad = 2 + round(felicidad.valueDisplayed / 101 * 2);
    image(icons[indiceFelicidad], 0.0507, felicidad.startPosition.y, iconsSize / factor * icons[indiceFelicidad].width / icons[indiceFelicidad].height, iconsSize);
    // Dibujado del texto de los días
    push();
    scale(1 / factor, 1);
    textFont(ubuntuRegular);
    textSize(0.075);
    fill(255);
    textAlign(RIGHT, TOP);
    text("Día: " + day, factor - 0.02 * factor, 0 + 0.02);
    pop();

    // Condiciones de fin de juego
    if (economia.valueDisplayed <= 3)
        endCause = 0;
    if (felicidad.valueDisplayed <= 0)
        endCause = 1;
    if (totalContagios < 1 && totalContagios != 0)
        endCause = 2;
    
    if (endCause != -1)
        changeGameState(3);
}

function showMoreCards() {
    let firstNotShown = availableCards.length - 1;
    availableCards.every((card, i) => {
        if (card.mode == 0) {
            firstNotShown = i;
            return false;
        }
        return true;
    });
    timer = firstNotShown * deltaCard;
    prevCardShown = -1;
}