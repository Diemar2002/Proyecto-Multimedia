scenes = [
    mainGame
];

var currentScene = 0;

function draw() {
    background(0);
    scenes[currentScene]();
}

function mainGame() {
    // Actualización de los contagios

    contagios = 0;
    provincias.forEach(provincia => {
        contagios += provincia.contagios;
    });

    // contagiados.value = Math.log10(contagios) / Math.log10(1.1932);
    contagiados.value = (contagios / poblacionTotal) * 100;

    economia.update();
    felicidad.update();
    contagiados.update();
    economia.render();
    felicidad.render();
    contagiados.render();
}

function actualizarContagios() {
    provincias.forEach(provincia => {
        provincia.contagios *= ccp;
        if (provincia.contagios > provincia.population)
            provincia.contagios = provincia.population;
        if (Math.random() < (provincia.contagios / provincia.population)) {
            nueva = provincias[provincia.cercanas[int(Math.random() * (provincia.cercanas.length))]]
            nueva.contagios += 1;
            console.log("Contagio desde ", provincia.name, " hasta ", nueva.name);
        }
    });
}