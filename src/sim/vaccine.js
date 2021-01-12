let vaccineProgress = 0;

var flag_investingOnVaccine = false;
var flag_vaccinating = [false, false, false];
var canVaccinate = [true, true, true];

function updateVaccines() {
    let medidas = [];

    // Medidas
    if (((economia.value / 100 - cp_e_investonvaccine) > 0) && ((totalContagios / totalPopulation) >= cp_investonvaccine)) {
        if (flag_investingOnVaccine)
            medidas.push(new Card(t_investonvaccineOld, () => {flag_investingOnVaccine = true}, () => {flag_investingOnVaccine = false}));
        else
            medidas.push(new Card(t_investonvaccineNew, () => {flag_investingOnVaccine = true}, () => {flag_investingOnVaccine = false}));
    }

    if (vaccineProgress >= 0.99) {
        if (canVaccinate[0])
            medidas.push(new Card(t_vacunarsanitarios, () => {flag_vaccinating[0] = true;}, () => {flag_vaccinating[0] = false}));
        if (canVaccinate[1])
            medidas.push(new Card(t_vacunartrabajadores, () => {flag_vaccinating[1] = true;}, () => {flag_vaccinating[1] = false}));
        if (canVaccinate[2])
            medidas.push(new Card(t_vacunarjovenes, () => {flag_vaccinating[2] = true;}, () => {flag_vaccinating[2] = false}));
    }

    function mostrarMedidas(medidas) {
        medidas.forEach(medida => {
            availableCards.push(medida);
        });
        showMoreCards();
    }

    // Paquete de medidas de la vacuna
    if (medidas.length >= numUntilGroup)
        availableCards.push(new Card(t_medidasvacuna, mostrarMedidas, none, medidas));
    else {
        medidas.forEach(medida => {
            availableCards.push(medida);
        });
    }
}



function applyVaccines() {
    if (vaccineProgress >= 0.99) {
        provincias.forEach(provincia => {
            let perc = provincia.population / totalPopulation;
            let ableToVaccinate = provincia.population - provincia.totalContagios - provincia.totalRecovered - provincia.deaths;
            if (flag_vaccinating[0]) { // Vacunando a los médicos y ancianos
                let toVaccinate = cp_medicosyancianos * cp_vaccinatedPercPerDay * provincia.population;
                if (toVaccinate > ableToVaccinate)
                    toVaccinate = ableToVaccinate;
                provincia.recovered[0] += toVaccinate;
                if (toVaccinate < 1)
                    flag_vaccinating[0] = false; // En el caso de que ya no se pueda vacunar a nadie más se deja de hacer automáticamente
            }
            if (flag_vaccinating[1]) { // Vacunado a los trabajadores
                let toVaccinate = cp_trabajadores * cp_vaccinatedPercPerDay * provincia.population;
                if (toVaccinate > ableToVaccinate)
                    toVaccinate = ableToVaccinate;
                provincia.recovered[1] += toVaccinate;
                if (toVaccinate < 1)
                    flag_vaccinating[1] = false;
            }
            if (flag_vaccinating[2]) { // Vacunado de los jóvenes
                let toVaccinate = cp_jovenes * cp_vaccinatedPercPerDay * provincia.population;
                if (toVaccinate > ableToVaccinate)
                    toVaccinate = ableToVaccinate;
                provincia.recovered[2] += toVaccinate; 
                if (toVaccinate < 1)
                    flag_vaccinating[2] = false;
            }
        });
    } else if (day >= dayVaccineCanIncrease) { // Aumento del progreso de la vacuna
        vaccineProgress += baseVaccineProgress * (flag_investingOnVaccine ? investingMultiplier:1);
    }
}