// Introducción
gameStateSetups[0] = () => {
    intro_timer = 0;
    intro_MP = true;
}

var intro_MP = true;

intro_timer = 0;
intro_times = [
    1, // Fade in
    15, // Primer texto
    1, // Fade out
];

intro_prevStep = -1;
gameStates[0] = () => {
    intro_timer += deltaTime / 1000;
    let currentStep = 0;
    let checking = 0;
    let running = false;
    let cummulative = 0;
    intro_times.every((element, i) => {
        checking += element;
        cummulative = checking;
        if (intro_timer <= checking) {
            currentStep = i;
            running = true;
            return false;
        }
        return true;
    });

    if (!running) { // Se ha terminado la introducción
        changeGameState(1); 
        return;
    }

    // Primer frame de animación
    if (intro_prevStep != currentStep) {
        switch (currentStep) {
            case 0: // Fade in
                //background(0);
                break;
            case 1: // Texto
                stroke(0);
                background(0);
                textAlign(CENTER, CENTER);
                textSize(0.075);
                textFont(ubuntuLight);
                rectMode(CENTER);
                fill(0);
                break;
            case 2: // Fade out
                background(255);
                break;
        }
    }

    switch (currentStep) {
        case 0: { // Fade in
            let prog = (cummulative - intro_timer) / intro_times[currentStep];
            background(prog * 30, prog * 27, prog * 53);
            break;
        }
        case 1: // Texto
        background(0);
        fill(255);
        scale(1 / factor, 1);
        const textOffset = 0.1;
        text("El virus SARS-cov-2, más conocido como coronavirus, acaba de llegar a España. Eres el presidente de España, Peter Xanchez, y tu misión será dirigir el país de tal manera que proteja a los ciudadanos españoles y que no destruya la economía del país. Buena suerte…", 0.5 * factor, 0.5, (1 - 2 * textOffset) * factor, 1 - 2 * textOffset);
        break;
        case 2: {// Fade out
            let prog = (cummulative - intro_timer) / intro_times[currentStep];
            background((1 - prog) * 30, (1 - prog) * 27, (1 - prog) * 53);
            break;
        }
    }

    let mx = mouseX / width;
    let my = mouseY / height;
    if (mouseIsPressed && mx > 0 && mx < 1 && my > 0 && my < 1 && !intro_MP)
        changeGameState(1);
    else if (!mouseIsPressed)
        intro_MP = false;

    intro_prevStep = currentStep;
}