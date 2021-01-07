let day = 0;
let data = [];

function simulationStep() {
    // Variables
    const baseR0 = 2.5;

    let buffProvincias = [...provincias];

    // ---------------------------------------
    provincias.forEach((provincia, index) => {
        // Contagios intraprovinciales
        // Simulación de cada provincia
        let R0 = baseR0;
        // Reducción por el uso de mascarillas
        let p = provincia.maskUsage;
        let q = 1 - p;
        R0 *= (q * q) + 2 * (p * q) * 0.3 + (p * p) * 0.05;
        // Aplicación del R0
        let newCases = 0;
        // Número de personas contagiadas de cada tipo
        let symptomatic = 0;
        let viralActive = 0;
        let suitablePeople = (provincia.population - provincia.deaths - provincia.recovered - provincia.totalContagios);
        let probSuitable = suitablePeople / provincia.population;

        // Cálculo de las muertes
        provincia.contagios.forEach((d, i) => {
            let deaths = d * (provincia.deathRate / 10);
            provincia.contagios[i] -= deaths;
            provincia.deaths += deaths;
        });

        // Cálculo de las variables
        provincia.totalContagios = 0;
        provincia.contagios.forEach((d, index) => {
            provincia.totalContagios += d;
            if (index >= 2) // A partir del día 3 se puede contagiar a las personas hasta el final de los 15 días.
                viralActive += d;
            if (index >= 4) { // A partir del día 5 aparecen los síntomas.
                symptomatic += d;
                viralActive += d; 
            } 
        });
        // Aplicación de las variables al R0

        // Cálculo de los contagios (por ahora sin tener en cuenta las cuarentenas)
        newCases = R0 * viralActive * probSuitable / 10;
        
        // Actualización de los días
        provincia.recovered += provincia.contagios[provincia.contagios.length - 1];
        for (i = provincia.contagios.length - 1; i > 0; i--) { // Paso de los contagios al día siguiente
            provincia.contagios[i] = provincia.contagios[i - 1];
        }
        if (newCases < 0)
        newCases = 0;
        provincia.contagios[0] = newCases; // Añadir los casos nuevos del día
        
        // Contagios interprovinciales
        let traspassPotencial = 0.01; // Posibilidad de que una persona ignore las medidas de bloqueo de provincia
        let interMultiplier = provincia.locked ? traspassPotencial:1;
        let percentMoved = 0.013404; // Porcentaje de la población que se mueve entre provincias al día (aproximación burda, pero no tengo más datos)
        provincia.cercanas.forEach(element => {
            let buff = buffProvincias[element];
            let suitableProb = (buff.population - buff.deaths - buff.recovered - buff.totalContagios) / buff.population;
            buff.contagios[0] += suitableProb * percentMoved * provincia.totalContagios * interMultiplier * R0 / 10;
        });
        if (provincia.totalContagios > provincia.population)
            provincia.totalContagios = provincia.population;
    }); 

    provincias = [...buffProvincias];

    // Añadir las cartas
    day += 1;
}