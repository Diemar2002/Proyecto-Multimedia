class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

function infectionScale(x) { // Curva mejorada (sólo válida para el intervalo [0, 1])
    const a = 9.45;
    return (log(x * exp(a) + 1) / log(exp(a) + 1));
}

class StatusBar {
    static barSpeed = 25;
    static barWidth = 0.025;

    constructor(min, max, start, color, startPosition, endPosition) {
        this.min = min;
        this.max = max;
        this.value = start;
        this.valueDisplayed = start;
        this.color = color;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    update() {
        if (this.value < 0)
            this.value = 0
        else if (this.value > this.max)
            this.value = this.max;

        let dir = (this.valueDisplayed < this.value) ? 1:-1;
        let speed = Math.abs(this.value - this.valueDisplayed) + StatusBar.barSpeed / 5;
        if (speed > StatusBar.barSpeed)
            speed = StatusBar.barSpeed;

        this.valueDisplayed += dir * speed * deltaTime / 1000;
        this.valueDisplayed = constrain(this.valueDisplayed, this.min, this.max);
    }

    render() {
        //strokeCap(ROUND);
        strokeWeight(StatusBar.barWidth * height);
        // Dibujado de la línea de fondo
        const backColorMultiplier = 0.3;
        const backColor = new Color(this.color.r * backColorMultiplier, this.color.g * backColorMultiplier, this.color.b * backColorMultiplier);
        stroke(backColor.r, backColor.g, backColor.b);
        line(this.startPosition.x, this.startPosition.y, this.endPosition.x, this.endPosition.y);
        // Dibujado de la línea de progreso
        stroke(this.color.r, this.color.g, this.color.b);
        let dir = p5.Vector.sub(this.endPosition, this.startPosition);
        let progress = (this.valueDisplayed / (this.max - this.min)) * dir.mag();
        dir.normalize();
        dir.mult(progress);
        line(this.startPosition.x, this.startPosition.y, dir.x + this.startPosition.x, dir.y + this.startPosition.y);
    }
}

let canps = true;

class Card {
    static cardSpeed = 10;
    static cardSize = 0.6;
    static screenBorder = 0.2;

    constructor(text, accept, reject, ...args) {
        this.accepted = accept;
        this.rejected = reject;
        this.args = args;

        this.order = -1;
        this.mode = 0
        this.position = new p5.Vector(0.5, 1.75);
        this.objPosition = new p5.Vector(0.5, 1.75);
        this.prevMode = 0;
        this.selecting = false;
        this.alive = true;
        this.text = text;
        this.inPosition = false;
    }

    update() {
        if (this.mode == 1 && this.order == 0) { // Movimiento de la carta cuando se arrastra el cursor por encima
            if (mouseIsPressed && mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
                if (!this.selecting)
                    sounds[2].play();
                if (mouseX / width <= Card.screenBorder || mouseX / width >= (1 - Card.screenBorder))
                    this.objPosition.set(mouseX / width, mouseY / height);
                else
                    this.objPosition.set(mouseX / width / 4 + 0.375, mouseY / height / 4 + 0.375);
                this.selecting = true;
            } else {
                if (this.selecting) {
                    let playSound = true;
                    if (this.objPosition.x <= Card.screenBorder) {
                        this.mode = 2;
                        this.accepted(...this.args);
                        updateBars();
                    }
                    else if (this.objPosition.x >= (1 - Card.screenBorder)) {
                        this.mode = 3;
                        this.rejected(...this.args);
                        updateBars();
                    } else if (mouseY / height >= (1 - Card.screenBorder)) {
                        availableCards.forEach(card => {
                            card.mode = 4;
                        });
                        canps = false;
                        playSound = false;
                    } else {
                        this.objPosition.set(0.5, 0.5);
                        availableCards.forEach(card => {
                            card.mode = 1;
                        });
                        playSound = false;
                    }
                    if (playSound)
                        sounds[4].play();
                    sounds[3].play();
                }
                this.selecting = false;
            }
        }

        if (this.mode == 4 && mouseIsPressed && canps) {
            canps = false;
            if (!sounds[3].isPlaying())
                sounds[3].play();
            this.mode = 1;
        }
        if (!mouseIsPressed)
            canps = true;

        if (this.prevMode != this.mode) { // Cambio del modo
            switch (this.mode) {
                case 0: // Fuera de la pantalla
                    this.objPosition.y = 1.75;
                    this.objPosition.x = 0.5;
                    break;
                case 1: // Dentro de la pantalla
                    this.objPosition.y = 0.5;
                    this.objPosition.x = 0.5;
                    break;
                case 2: // Aceptada (Izquierda)
                    this.objPosition.x = -0.75;
                    break;
                case 3: // Rechazada (Derecha)
                    this.objPosition.x = 1.75;
                    break;
                case 4: // Ocultas
                    this.objPosition.y = 1 + Card.cardSize / 3;
                    this.objPosition.x = 0.5;
                    break;
            }
        }

        // Cálculo del movimiento
        let dir = p5.Vector.sub(this.objPosition, this.position);
        let dis = dir.mag() * 5 + Card.cardSpeed / 200;
        if (dis >= Card.cardSpeed)
            dis = Card.cardSpeed;
        
        if (dis > Card.cardSpeed / 195) {
            dir.normalize();
            dir.mult(dis * deltaTime / 1000);
            this.position.add(dir);
            this.inPosition = false;
        } else {
            this.inPosition = true;
        }
        // - - - - - - - - - - - - - - - - - - -
        // Comprobación de la muerte
        if (this.position.x < -0.7 || this.position.x > 1.7)
            this.alive = false;

        this.prevMode = this.mode;
    }

    render() {
        // Inclinación
        if (!this.alive)
            return;

        let imageFactor = icons[5].width / icons[5].height;
        if (this.order <= 1 || !this.inPosition) {
            push();
                rectMode(CENTER);
                translate(this.position.x, this.position.y);
                scale(1 / factor, 1);
                rotate(this.position.x - 0.5);
                fill(0);
                image(icons[5], 0, 0,  Card.cardSize * imageFactor, Card.cardSize);
                image(icons[6], 0, 0, Card.cardSize * 1.075 * imageFactor, Card.cardSize * 1.075);
                textSize(Card.cardSize * 1 / 15);
                stroke(255, 255, 255);
                textFont(ubuntuRegular);
                textAlign(CENTER, CENTER);
                fill(255);
                text(this.text, 0, 0, (Card.cardSize * 13 / 15) / imageFactor / factor, (Card.cardSize * 13 / 15));

                // Dibujado de los iconos de aceptar y rechazar
                // Dibujar las imágenes
                if (this.order == 0) {
                    const iconsSize = 0.3;

                    // Aplicar la transparencia
                    if (this.mode == 1)
                        tint(255, 255, 255, 64);
                    else
                        tint(255, 255, 255, 191);

                    if (this.objPosition.x <= Card.screenBorder)
                        image(icons[10], 0, 0, iconsSize * icons[10].width / icons[10].height, iconsSize);
    
                    if (this.objPosition.x >= (1 - Card.screenBorder))
                        image(icons[11], 0, 0, iconsSize * icons[11].width / icons[11].height, iconsSize);
                }
            pop();
        } else {
            rectMode(CENTER);
            image(icons[5], this.position.x, this.position.y,  Card.cardSize / factor * imageFactor, Card.cardSize);
        }
    }
}