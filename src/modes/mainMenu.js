var mainMenuVirus;
const mainMenuVirusAmount = 15;

gameStateSetups[2] = () => {
    mainMenuVirus = [];
    for (i = 0; i < mainMenuVirusAmount; i++)
        mainMenuVirus[i] = new Virus;
    mainMenuVirus.sort((a, b) => {return a.size - b.size});
    textFont(ubuntuLight);
    textSize(0.06);
    textAlign(CENTER, CENTER);
}

// image[8] e image[9]
gameStates[2] = () => {
    background(30, 27, 53);
    
    // Simulación de los virus
    mainMenuVirus.forEach(virus => {
        virus.update();
        virus.render();
    });
    push();
    scale(1 / factor, 1);
    text("Toque en cualquier punto de la pantalla", 0.5 * factor, 0.5);
    pop();

    let mx = mouseX / width;
    let my = mouseY / height;
    if (mouseIsPressed && mx > 0 && mx < 1 && my > 0 && my < 1)
        changeGameState(0);
}

class Virus {
    static maxspeed = 0.2;
    static maxsize = 0.3;
    static minsize = 0.01;

    constructor() {
        this.position = new p5.Vector(random(), random());
        this.velocity = new p5.Vector(random(-Virus.maxspeed, Virus.maxspeed), random(-Virus.maxspeed, Virus.maxspeed));
        this.size = random(Virus.minsize, Virus.maxsize);
        this.virusID = Math.floor(random() * 100 / 50);
    }

    update() {
        this.position.add(p5.Vector.mult(this.velocity, deltaTime / 1000));
        if (this.position.x <  -Virus.maxsize)
            this.position.x = 1 + Virus.maxsize;
        else if (this.position.x > (1 + Virus.maxsize))
            this.position.x = -Virus.maxsize;
        if (this.position.y < -Virus.maxsize)
            this.position.y = 1 + Virus.maxsize;
        else if (this.position.y > (1 + Virus.maxsize))
            this.position.y = -Virus.maxsize;
    }

    render() {
        image(icons[8 + this.virusID], this.position.x, this.position.y, this.size / factor * icons[8 + this.virusID].width / icons[8 + this.virusID].height, this.size);
    }
}