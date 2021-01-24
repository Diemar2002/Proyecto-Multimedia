const percToQuarantine = 0.1;
const percToMask = 0.03;

// Funciones de las cartas
function none(provincia) {

}

// Cuarentena

function quarantine(provincia) {
    provincia.confinada = true;
    provincia.quarantineStreak += 1;
    // Cambio de la felicidad
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

// Mascarilla

function mask(provincia, percent) {
    provincia.maskUsage = percent;
}

function unmask(provincia) {
    provincia.maskUsage = 0;
    globalLockdown = false;
}

function maskAll(provincias, perc) {
    provincias.forEach(provincia => {
        mask(provincia, perc);
    });
}

function unmaskAll(provincias) {
    provincias.forEach(provincia => {
        unmask(provincia);
    });
}

// Cuarentena global

function globalQuarantine() {
    provincias.forEach(provincia => {
        provincia.confinada = true;
    });
    globalLockdown = true;
}

// Cierre de fronteras 

function close(provincia) {
    provincia.locked = true;
}

function open(provincia) {
    provincia.locked = false;
}

function closeAll(provincias) {
    provincias.forEach(provincia => {
        provincia.close();
    });
}

function openAll(provincias) {
    provincias.forEach(provincia => {
        provincia.open();
    });
}

// ---------------------------------------
// Vacunas -------------------------------



// ---------------------------------------

function updateCards() {
    
    // #######################################################################################
    // Eventos ###############################################################################

    let buff = [];
    events.forEach((event, i) => {
        if ((event["p"] / 6) > random())
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
    if ((totalContagios / totalPopulation) >= cp_cuarentenaGeneral)
        globalLockdownAvailable = true;
    
    function showQuarantine(oldQ, newQ) {
        if (oldQ.length >= numUntilGroup) {
            availableCards.push(new Card(t_g_confinamientoOld_i + oldQ.length + t_g_confinamientoOld_ii ,quarantineAll , none, oldQ));
        } else {
            oldQ.forEach(provincia => {
                availableCards.push(new Card(t_confinamientoOld_i + provincia.name + t_confinamientoOld_ii, quarantine, unquarantine, provincia));
            });
        }
        if (newQ.length >= numUntilGroup) {
            availableCards.push(new Card(t_g_confinamientoNew_i + newQ.length + t_g_confinamientoNew_ii, quarantineAll , none, newQ));
        } else {
            newQ.forEach(provincia => {
                availableCards.push(new Card(t_confinamientoNew_i + provincia.name + t_confinamientoNew_ii, quarantine, unquarantine, provincia));
            });
        }
    }

    if (!globalLockdownAvailable)
        showQuarantine(oldQuarantine, newQuarantine);
    else {
        availableCards.push(new Card(t_cuarentenageneral, globalQuarantine, () => {showQuarantine(oldQuarantine, newQuarantine); showMoreCards();}));
    }
    
    // Mascarillas ---------------------------------------------------------------------------

    // Obligación mascarillas
    let masksO = [];
    provincias.forEach(provincia => {
        let percInfected = provincia.totalContagios / provincia.population;
        if (percInfected >= cp_obligacionMascarillas)
            masksO.push(provincia);
    });

    if (masksO.length >= numUntilGroup) {
        availableCards.push(new Card(t_g_obligacionMascarillas_i + masksO.length + t_g_olbligacionMascarillas_ii, maskAll, unmaskAll, masksO, maskUsageObligatory));
    } else {
        masksO.forEach(provincia => {
            availableCards.push(new Card(t_obligacionMascarillas_i + provincia.name + t_obligacionMascarillas_ii, mask, unmask, provincia, maskUsageObligatory));
        });
    }
    // Recomendación de mascarillas
    let masksR = [];
    provincias.forEach(provincia => {
        let percInfected = provincia.totalContagios / provincia.population;
        if ((percInfected >= cp_recomendacionMascarillas) && !(masksO.includes(provincia)))
            masksR.push(provincia);
    });

    if (masksR.length >= numUntilGroup) {
        availableCards.push(new Card(t_g_recomendacionMascarillas_i + masksR.length + t_g_recomendacionMascarillas_ii, maskAll, unmaskAll, masksR, maskUsageRecommended));
    } else {
        masksR.forEach(provincia => {
            availableCards.push(new Card(t_recomendacionMascarillas_i + provincia.name + t_recomendacionMascarillas_ii, mask, unmask, provincia, maskUsageRecommended));
        });   
    }
    
    // #######################################################################################
    // Cartas de flags #######################################################################
    /*
     * Flags:
     * Cierre de fronteras
     * Toque de queda
     * Límite de personas en las reuniones
     * -- Relacionadas con los comercios --
     * Límite de aforo
     * Comercos de ocio cerrados
     * Comercios como los bares cerrados
     */

    let availableFlags = [];
    
    // Añadir las flags
    // let closeProvinces = [];
    let globalPerc = totalContagios / totalPopulation;
    if (globalPerc >= cp_fronteras) { // Cierre de fronteras
        if (!flag_fronteras)
            availableFlags.push(new Card(t_fronteras, () => {flag_fronteras = true;}, () => {flag_fronteras = false;}));
    } else
        flag_fronteras = false; // Cuando se deja de cumplir la condición se vuelven a abrir las fronteras automáticamente
    // Toque de queda
    if (globalPerc >= cp_toquequeda) {
        if (!flag_toquedequeda)
            availableFlags.push(new Card(t_toquequeda, () => {flag_toquedequeda = true;}, () => {flag_toquedequeda = false;}));
    } else
        flag_toquedequeda = false;
    // Límite de personas en las reuniones
    if (globalPerc >= cp_reuniones) {
        if (!flag_reuniones && !globalLockdown)
            availableFlags.push(new Card(t_reuniones, () => {flag_reuniones = true;}, () => {flag_reuniones = false;})) 
    } else
        flag_reuniones = false;
    // Relaccionadas con los comercios
    // Límite de aforo
    if (globalPerc >= cp_aforo) {
        if (!flag_comercios[0])
            availableFlags.push(new Card(t_aforo, () => {flag_comercios[0] = true;}, () => {flag_comercios[0] = false;})) 
    } else
        flag_comercios[0] = false;
    // Cierre de los locales de ocio
    if (globalPerc >= cp_ocio) {
        if (!flag_comercios[1])
            availableFlags.push(new Card(t_ocio, () => {flag_comercios[1] = true;}, () => {flag_comercios[1] = false;})) 
    } else
        flag_comercios[1] = false;
    // Cierre de los bares
    if (globalPerc >= cp_bares) {
        if (!flag_comercios[2])
            availableFlags.push(new Card(t_bares, () => {flag_comercios[2] = true;}, () => {flag_comercios[2] = false;})) 
    } else
        flag_comercios[2] = false;
    // ----------------

    function showAllFlags(flags) {
        flags.forEach(flag => {
            availableCards.push(flag);
        });
        showMoreCards();
    }


    if (availableFlags.length != 0)
        availableCards.push(new Card("Existen otras medidas que se pueden tomar.\n¿Mostrarlas?", showAllFlags, none, availableFlags));


    // ######################################################################################
    // Vacunas ------------------------------------------------------------------------------

    updateVaccines();

    // #######################################################################################
    // Primer step ###########################################################################

    if (day <= deltaStep)
        availableCards.push(new Card("Se detectan los primeros casos en " + starter.name, none, none));

    // --------------------------------------
    if (availableCards.length == 0) {
        prevMicroState = -1;
        microState = 0;
    }
}