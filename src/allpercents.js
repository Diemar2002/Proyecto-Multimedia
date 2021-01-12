// cp_ -> constante de porcentaje
// Las constantes de porcentajes siempre están divididas entre 100 así que
// se puede poner el porcentaje diréctamente ej: 10% -> 10 / 100
// t_ -> texto
// Estas suelen ser el texto que tiene la carta.

// ###############################################
// Variales de las cartas ########################

// ----- A nivel global -----

// Porcentaje de población necesario para que salga el cierre de fronteras
const cp_fronteras =            0.014           / 100;
// Porcentaje de población necesario para que salga el toque de queda
const cp_toquequeda =           0.117021        / 100;
// Porcentaje de población necesario par que salga el límite de reuniones
const cp_reuniones =            0.05            / 100;

const t_fronteras = "Los casos están aumentando por todo el mundo.\n¿Cerrar las fronteras del país?";
const t_toquequeda = "Los casos están aumentando por todo el país.\n¿Se impone un toque de queda?";
const t_reuniones = "Los casos están aumentando por todo el país.\n¿Se limitan los grupos de personas?";

// Porcentaje de población necesaro para que se puede hacer una cuarentena general
const cp_cuarentenaGeneral =    21.27            / 100;

const t_cuarentenageneral = "Los casos por toda España están creciendo.\n¿Imponer una cuarentena en todo el país?";

// ----- A nivel provincial -----

// Porcentaje de población necesario para la opción de recomendación de mascarillas
const cp_recomendacionMascarillas = 0.5          / 100;
// Porcentaje necesario para las mascarillas obligatorias
const cp_obligacionMascarillas =    3.0          / 100;
// Porcentaje necesario para activar el confinamiento en la provincia
const cp_confinar =                 3.0          / 100;

// Textos de las cartas de arriba -------------------------------------------
const t_obligacionMascarillas_i = "El número de contagios en "; // Nombre de provincia
const t_obligacionMascarillas_ii = " es elevado.\n¿Obligar a llevar mascarilla?";

const t_g_obligacionMascarillas_i = "El número de contaghios en "; // Número de provincias
const t_g_olbligacionMascarillas_ii = " provincias es elevado.\n¿Obligar a llevar mascarilla?";

const t_recomendacionMascarillas_i = "El número de contagios en "; // Nombre de provincia
const t_recomendacionMascarillas_ii = " es ligeramente elevado.\n¿Recomendar el uso de mascarillas?";

const t_g_recomendacionMascarillas_i = "El número de contagios en "; // Número de provincias
const t_g_recomendacionMascarillas_ii = " provincias es ligeramente elevado.\n¿Recomendar el uso de mascarillas?";

const t_confinamientoNew_i = "El número de contagios en "; // Nombre de provincia
const t_confinamientoNew_ii = " es alto.\n¿Se pone en cuarentena?";

const t_g_confinamientoNew_i = "El número de contagios en "; // Número de provincias
const t_g_confinamientoNew_ii = " es elevado. \n¿Se ponen en cuarentena?";

const t_confinamientoOld_i = "El número de contagios en "; // Nombre de provincia
const t_confinamientoOld_ii = " sigue siendo alto.\n¿Se mantiene la cuarentena?";

const t_g_confinamientoOld_i = "El número de contagios en "; // Número de provincias
const t_g_confinamientoOld_ii = " sigue sinedo alto.\n¿Se mantienen en cuarentena?";
// Consecuencias de las cartas de arriba --------------------------------------

// cp_f_ -> Constante de porcentaje de felicidad: porcentaje que se elimina a la felicidad si la medida está impuesta.
// cp_e_ -> Constante de porcentaje de economia: porcentaje que se le elimina a la econommia si la medida está impuesta.
// El porcentaje de economía todavía lo estoy pensando, pero croe que se quedará así.

// Consecuencias del cierre de fronteras
// const cp_f_fronteras =              0           / 100;
const cp_e_fronteras =              5           / 100;

// Consecuencias del toque de queda
const cp_f_toquequeda =             20          / 100;
const cp_e_toquequeda =             8           / 100;

// Consecuencias de las restricciones de tamaño de las reuniones
const cp_f_reuniones =              10          / 100;
const cp_e_reuniones =              8           / 100;

// Consecuencias de las restricciones a los comercios
const cp_f_limiteAforo =            49          / 100;
const cp_e_limiteAforo =            25          / 100;

// Consecuencias del cierre de los locales de ocio
const cp_f_ocio =                   10          / 100;
const cp_e_ocio =                   40          / 100;

// Consecuencias del cierre de los bares
const cp_f_bares =                  30          / 100;
const cp_e_bares =                  20          / 100;

// Consecuencias de la recomendación de la mascarilla
const cp_f_mascarillaRecomendada =  5           / 100;
const cp_e_mascarillaRecomendada =  7.5         / 100; // Se suma

// Consecuencias de la obligación al uso de la mascarilla
const cp_f_mascarillaObligada =     30          / 100;
const cp_e_mascarillaObligada =     15          / 100; // Se suma

// Consecuencias del confinamiento de una provincia (porcentaje respecto a la provincia)
const cp_f_confinamiento =          5           / 100; // Se eleva
const cp_e_confinamiento =          20          / 100;

// ###############################################
// Variables aplicadas a la simulación ###########

const lockdowneffectiveness = 0.3;
const percentMoved = 0.013404; // Porcentaje de la población que se mueve entre provincias al día (aproximación burda, pero no tengo más datos)
const maskUsageObligatory = 1.0; // Uso de mascarilla obligatoio (100%)
const maskUsageRecommended = 0.3; // Uso de mascarilla recomendado (30%)
const numUntilGroup = 3; // Número de cartas antes de que se agrupen
const baseVaccineProgress = 1 / 360;
const investingMultiplier = 3;
const dayVaccineCanIncrease = 15;

// ###############################################
// Vacunas #######################################

const t_medidasvacuna = "Existen varias medidas con respecto a la vacuna.\n¿Mostrarlas?";
const t_vacunarsanitarios = "¿Vacunar a los sanitarios y ancianos?";
const t_vacunartrabajadores = "¿Vacunar a los trabajadores?";
const t_vacunarjovenes = "¿Vacunar a los jóvenes entre 12 y 30 años?"

const t_investonvaccineNew = "¿Invertir en la vacuna?";
const t_investonvaccineOld = "¿Seguir invirtiendo en la vacuna?";

// Porcentaje de la población necesario para poder invertir en la vacuna
const cp_investonvaccine =           1            / 100;

// Consecuencias de la investigación de la vacuna
const cp_e_investonvaccine =         20           / 100;

// Consecuencias de la aplicación de la vacuna
const cp_m_vacunarsanitarios =       80           / 100;

const cp_e_vacunartrabajadores =     10           / 100; // Se suma

const cp_e_vacunarjovenes =          10           / 100;

// Velocidad de vacunación y efectividad de la misma
const cp_vaccineEfectiveness =       95           / 100;
const cp_vaccinatedPercPerDay =      1.5          / 100;

// Variables para la simulación de la vacuna
const cp_medicosyancianos = 19.42                 / 100;
const cp_trabajadores =     42.00                 / 100;
const cp_jovenes = 1 - cp_medicosyancianos + cp_trabajadores;

// Mensajes del final
endMessages = [
    "España sufre una tremenda crisis gracias a tu pésima gestión del país.",
    "Nadie en tu país te quiere como líder del gobierno, por lo que eres expulsado de la presidencia y te enfrentas a cargos por atentar contra la salud de los habitantes de España",
    "Enhorabuena, has conseguido combatir al virus."
];