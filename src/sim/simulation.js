let day = 0;
let data = [];
var nextEvents = [];

var globalLockdown = false;
var totalContagios = 0;

// -----------------------------------------------
// Flags de simulacón ----------------------------

var flag_comercios = [false, false, false];
/*
 * Comercios:
 * 1 - Límite de aforo
 * 2 - Ocio
 * 3 - Bares
*/
var flag_fronteras = false;
var flag_reuniones = false;
var flag_toquedequeda = false;

// -----------------------------------------------
// Simulación ------------------------------------

function simulationStep() {

    // Variables
    const baseR0 = 2.5;

    let buffProvincias = [...provincias];

    totalContagios = 0;
    // ---------------------------------------
    // Aplicación de la vacuna -----
    applyVaccines();
    // -----------------------------
    provincias.forEach((provincia, index) => {

        // Contagios intraprovinciales
        // Simulación de cada provincia
        let R0 = baseR0;
        // Reducción por el uso de mascarillas
        let p = provincia.maskUsage * (felicidad.value / 100);
        let q = 1 - p;
        R0 *= (q * q) + 2 * (p * q) * 0.3 + (p * p) * 0.05;
        // Aplicación del R0
        let newCases = 0;
        // Número de personas contagiadas de cada tipo
        let symptomatic = 0;
        let viralActive = 0;
        let suitablePeople = (provincia.population - provincia.deaths - provincia.totalRecovered - provincia.totalContagios);
        let probSuitable = suitablePeople / provincia.population;

        // Cálculo de las muertes
        provincia.contagios.forEach((d, i) => {
            let deaths = d * (provincia.deathRate / 10) * (flag_vaccinating[0] ? 0.2:1);
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

        // Confinamiento
        p = provincia.confinada * (felicidad.value / 100);
        q = 1 - p;
        R0 *= 1 - (lockdowneffectiveness * p); // Probablemente no sea una relación lineal

        // Cálculo de los contagios (por ahora sin tener en cuenta las cuarentenas)
        newCases = R0 * viralActive * probSuitable / 10;
        
        // Actualización de los días
        provincia.recovered[0] += provincia.contagios[provincia.contagios.length - 1] + cp_medicosyancianos;
        provincia.recovered[1] += provincia.contagios[provincia.contagios.length - 1] + cp_trabajadores;
        provincia.recovered[2] += provincia.contagios[provincia.contagios.length - 1] + cp_jovenes;
        for (i = provincia.contagios.length - 1; i > 0; i--) { // Paso de los contagios al día siguiente
            provincia.contagios[i] = provincia.contagios[i - 1];
        }
        if (newCases < 0)
        newCases = 0;
        provincia.contagios[0] = newCases; // Añadir los casos nuevos del día

        provincia.totalRecovered = provincia.recovered[0] + provincia.recovered[1] + provincia.recovered[2];
        
        // Contagios interprovinciales
        let traspassPotencial = felicidad.value / 100; // Posibilidad de que una persona ignore las medidas de bloqueo de provincia
        provincia.cercanas.forEach(element => {
            let buff = buffProvincias[element];
            let interMultiplier = (provincia.locked || buff.locked) ? traspassPotencial:1;
            let suitableProb = (buff.population - buff.deaths - buff.totalRecovered - buff.totalContagios) / buff.population;
            buff.contagios[0] += suitableProb * percentMoved * provincia.totalContagios * interMultiplier * R0 / 10;
        });
        if (provincia.totalContagios > provincia.population)
            provincia.totalContagios = provincia.population;

        totalContagios += provincia.totalContagios;
    }); 

    provincias = [...buffProvincias];

    // Añadir las cartas
    day += 1;
}

// Se que se puede hacer una mejora sustancial en el códgo, pero no tengo tiempo.
function updateBars() {
    felicidad.value = 100;
    economia.value = 100;
    
    // Vacuna 
    if (flag_investingOnVaccine) {
        economia.value -= economia.value * cp_e_investonvaccine;
    }
    if (flag_vaccinating[0]) { // Vacunando a los médicos y ancianos
        economia
    }
    if (flag_vaccinating[1]) { // Vacunando a los trabajadores

    }
    if (flag_vaccinating[2]) { // Vacunando a los 

    }

    // Cierre de fronteras (A.K.A destrozo de la economía y la felicidad del pueblo)
    if (flag_fronteras)
        economia.value -= economia.value * cp_e_fronteras;
    // Limite de personas por reunión
    if (flag_reuniones) {
        felicidad.value -= felicidad.value * cp_f_reuniones;
        economia.value -= economia.value * cp_e_reuniones;
    }
    // Límites en los comercios
    if (flag_comercios[0]) {
        felicidad.value -= felicidad.value * cp_f_limiteAforo;
        economia.value -= economia.value * cp_e_limiteAforo;
    }
    if (flag_comercios[1]) {
        felicidad.value -= felicidad.value * cp_f_ocio;
        economia.value -= economia.value * cp_e_ocio;
    }
    if (flag_comercios[2]) {
        felicidad.value -= felicidad.value * cp_f_bares;
        economia.value -= economia.value * cp_e_bares;
    }
    // Toque de queda
    if (flag_toquedequeda) {
        felicidad.value -= felicidad.value * cp_f_toquequeda;
        economia.value -= economia.value * cp_e_toquequeda;
    }
    
    provincias.forEach(provincia => {
        let perc = provincia.population / totalPopulation;
        if (provincia.confinada) {
            felicidad.value -= (felicidad.value * cp_f_confinamiento * perc) ** provincia.quarantineStreak;
            economia.value -= economia.value * cp_e_confinamiento * perc;
        }
        if (provincia.maskUsage >= maskUsageObligatory) {
            felicidad.value -= felicidad.value * cp_f_mascarillaObligada * perc;
            economia.value += economia.value * cp_e_mascarillaObligada * perc;
        } else if (provincia.maskUsage >= maskUsageRecommended) {
            felicidad.value -= felicidad.value * cp_f_mascarillaRecomendada * perc;
            economia.value += economia.value * cp_e_mascarillaRecomendada * perc;
        }
    });

    if (economia.value > economia.max)
        economia.value = economia.max;
    else if (economia.value < economia.min)
        economia.value = economia.min;
    if (felicidad.value > felicidad.max)
        felicidad.value = felicidad.max;
    else if (felicidad.value < felicidad.min)
        felicidad.value = felicidad.min;
}