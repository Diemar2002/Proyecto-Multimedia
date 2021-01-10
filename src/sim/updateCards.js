const percToQuarantine = 0.1;
const percToMask = 0.03;

// Funciones de las cartas
function none(provincia) {

}

function quarantine(provincia) {
    provincia.confinada = true;
    provincia.quarantineStreak += 1;
    // Cambio de la felicidad
    felicidad.value -= ((0.05 * felicidad.value) ** provincia.quarantineStreak) * provincia.population / totalPopulation * 100;
} 

function unquarantine(provincia) {
    provincia.confinada = false;
    provincia.quarantineStreak = 0;
}

function quarantineAll(provincias) {
    provincias.forEach(provincia => {
        quarantine(provincia)
    });
}

function unquarantineAll(provincias) {
    provincias.forEach(provincia => {
        unquarantine(provincia);
    });
}

function mask(provincia) {
    provincia.maskUsage = 1;
}

function unmask(provincia) {
    provincia.maskUsage = 0;
    globalLockdown = false;
}

function maskAll(provincias) {
    provincias.forEach(provincia => {
        mask(provincia);
    });
}

function unmaskAll(provincias) {
    provincias.forEach(provincia => {
        unmask(provincia);
    });
}

function globalQuarantine() {
    provincias.forEach(provincia => {
        provincia.confinada = true;
    });
    globalLockdown = true;
}
// ---------------------------------------

function updateCards() {
    
    // #######################################################################################
    // Eventos ###############################################################################

    let buff = [];
    events.forEach((event, i) => {
        if ((event["p"] / 3) > random())
            buff.push(i);
    });
    // ------------------------
    // Variables de los eventos
    buff.forEach(event => {
        let buffNames = [...nombresProvincias];
        let buffIndex = Math.floor(random(0, buffNames.length));
        let provinciaA = buffNames[buffIndex];
        buffNames.splice(buffIndex, 1);
        buffIndex = Math.floor(random(0, buffNames.length));
        let provinciaB = buffNames[buffIndex];
        let rangoAleatorio = Math.floor(random(eventRanges[event][0], eventRanges[event][1]));

        let buffTenistas = [...tenistas];
        buffIndex = Math.floor(random(0, buffTenistas.length));
        let tenistaA = buffTenistas[buffIndex];
        buffNames.splice(buffIndex, 1);
        buffIndex = Math.floor(random(0, buffTenistas.length));
        let tenistaB = buffTenistas[buffIndex];
        let cantante = cantantes[Math.floor(random(0, cantantes.length))];

        // Añadir las cartas por cada evento
        let str = events[event]["display"];
        str = str.replace("%randPA", provinciaA);
        str = str.replace("%randPB", provinciaB);
        str = str.replace("%randR" , rangoAleatorio);
        str = str.replace("%randTA", tenistaA);
        str = str.replace("%randTB", tenistaB);
        str = str.replace("%randC" , cantante);
        
        let card = new Card(str, () => {console.log("aceptada")}, () => {console.log("rechazada")});
        availableCards.push(card); 
    });

    // #######################################################################################
    // Cartas de medidas #####################################################################
    
    // Cuarentena ----------------------------------------------------------------------------
    let newQuarantine = [];
    let oldQuarantine = [];
    provincias.forEach(provincia => {
        // Comprobación de la cuarentena
        let percInfected = provincia.totalContagios / provincia.population;
        if (percInfected >= percToQuarantine) {     
            if (provincia.quarantineStreak != 0)
                oldQuarantine.push(provincia);
            else {
                newQuarantine.push(provincia);
            }
        }
    });

    let globalLockdownAvailable = false
    if ((newQuarantine.length + oldQuarantine.length) >= (numProvincias / 4))
        globalLockdownAvailable = true;
    console.log(newQuarantine.length, oldQuarantine.length, numProvincias / 2);
    
    function showQuarantine(oldQ, newQ) {
        if (oldQ.length >= 5) {
            availableCards.push(new Card("El número de contagios en " + oldQ.length + " provincias sigue siendo alto.\n¿Se mantienen en cuarentena?",quarantineAll , none, oldQ));
        } else {
            oldQ.forEach(provincia => {
                availableCards.push(new Card("El número de contagos en " + provincia.name + " sigue siendo alto.\n¿Se mantiene la cuarentena?", quarantine, unquarantine, provincia));
            });
        }
        if (newQ.length >= 5) {
            availableCards.push(new Card("El número de contagios en " + newQ.length + " provincias es alto.\n¿Se ponen en cuarentena?",quarantineAll , none, newQ));
        } else {
            newQ.forEach(provincia => {
                availableCards.push(new Card("El número de contagios en " + provincia.name + " es alto.\n¿Se pone en cuarentena?", quarantine, unquarantine, provincia));
            });
        }
    }

    if (!globalLockdownAvailable)
        showQuarantine(oldQuarantine, newQuarantine);
    else {
        availableCards.push(new Card("Los casos por toda España están creciendo.\n¿Imponer una cuarentena en todo el país?", globalQuarantine, () => {showQuarantine(oldQuarantine, newQuarantine); showMoreCards();}));
    }
    
    // Mascarillas ---------------------------------------------------------------------------

    let masks = [];
    provincias.forEach(provincia => {
        let percInfected = provincia.totalContagios / provincia.population;
        if (percInfected >= percToMask)
            masks.push(provincia);
    });

    if (masks.length >= 5) {
        availableCards.push(new Card("El número de contagios en " + masks.length + " provincias es elevado.\n¿Obligar a llevar mascarillas", maskAll, unmaskAll, masks));
    } else {
        masks.forEach(provincia => {
            availableCards.push(new Card("El número de contagios en " + provincia.name + " es elevado.\n¿Obligar a llevar mascarillas?", mask, unmask, provincia));
        });
    }
    
    // Cierre de fronteras

    // #######################################################################################
    // Primera quincena ######################################################################

    if (day <= 15)
        availableCards.push(new Card("Se detectan los primeros casos en " + starter.name, none, none));

    // --------------------------------------
    if (availableCards.length == 0) {
        prevMicroState = -1;
        microState = 0;
    }
}