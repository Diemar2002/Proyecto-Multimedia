gameStateSetups[3] = () => {
    end_timer = 0;
}

var end_timer = 0;
const end_times = [
    1, 10, 1
];

let end_prevStep = -1;

gameStates[3] = () => {
    end_timer += deltaTime / 1000;
    let currentStep = 0;
    let checking = 0;
    let running = false;
    let cummulative = 0;
    end_times.every((element, i) => {
        checking += element;
        cummulative = checking;
        if (end_timer <= checking) {
            currentStep = i;
            running = true;
            return false;
        }
        return true;
    });

    if (!running) { // Se ha terminado el final
        changeGameState(2); 
        return;
    }

    // Primer frame de animación
    if (end_prevStep != currentStep) {
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
            let prog = (cummulative - end_timer) / end_times[currentStep];
            background(prog * 30, prog * 27, prog * 53);
            break;
        }
        case 1: // Texto
        background(0);
        fill(255);
        scale(1 / factor, 1);
        const textOffset = 0.1;
        text(endMessages[endCause], 0.5 * factor, 0.5, (1 - 2 * textOffset) * factor, 1 - 2 * textOffset);
        break;
        case 2: {// Fade out
            let prog = (cummulative - end_timer) / end_times[currentStep];
            background((1 - prog) * 30, (1 - prog) * 27, (1 - prog) * 53);
            break;
        }
    }

    let mx = mouseX / width;
    let my = mouseY / height;
    if (mouseIsPressed && mx > 0 && mx < 1 && my > 0 && my < 1 && !intro_MP)
        changeGameState(2);
    else if (!mouseIsPressed)
        intro_MP = false;

    end_prevStep = currentStep;
}