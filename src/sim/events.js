/*
 * Diferentes tipos de eventos
 * Variables:
 * randPA: provincia aleatoria A
 * randPB: provincia aleatoria B
 * randR: rango aleatorio (depende del tipo de evento)
 * randC: cantante aleatorio
 * randTA: tenista aleatorio 1
 * randTB: tenista aleatorio 2
 * 
 * Todas las variables se calculan independientemente de la provincia.
*/

var events = [
    {"p": 0.23, "contagios": 1.35, "f_aceptado": 0.03, "f_rechazado": 0.04, // TIpo 1
    "display": "La próxima semana se disputará el partido entre el equipo %randPA y %randPB, hay una gran expectación por este partido y se espera que haya unos %randR asistentes"}, // Tipo 1
    {"p": 0.18, "contagios": 1.22, "f_aceptado": 0.02, "f_rechazado": 0.03, // Tipo 2
    "display": "La próxima semana se disputará la final entre el equipo %randPA y %randPB, se espera que haya unos %randR asistentes"}, // Tipo 2
    {"p": 0.15, "contagios": 1.28, "f_aceptado": 0.01, "f_rechazado": 0.01, // Tipo 3
    "display": "La próxima semana se disputará la final entre el tenista %randTA y %randTB, se espera que haya unos %randR asistentes"}, // Tipo 3
    {"p": 0.08, "contagios": 1.31, "f_aceptado": 0.02, "f_rechazado": 0.02, // Tipo 4
    "display": "La próxima semana se disputará una de las últimas carreras del campeonato nacional de turismos y se espera que haya unos %randR asistentes"}, // Tipo 4
    {"p": 0.12, "contagios": 1.48, "f_aceptado": 0.03, "f_rechazado": 0.03, // Tipo 5
    "display": "La próxima semana dará lugar el concierto de %randC y se espera que haya unos 7500 asistentes"}, // Tipo 5
    {"p": 0.10, "contagios": 1.17, "f_aceptado": 0.06, "f_rechazado": 0.06, // Tipo 6
    "display": "La próxima semana dará lugar la feria anual en %randPA de tecnología y se espera que vengan %randR asistentes de todos los rincones del mundo"}, // Tipo 6
    {"p": 0.10, "contagios": 1.17, "f_aceptado": 0.06, "f_rechazado": 0.06, // Tipo 7
    "display": "La próxima semana dará lugar la feria anual en %randPA de móviles y se espera que vengan %randR asistentes de todos los rincones del mundo"}, // Tipo 7
    {"p": 0.10, "contagios": 1.17, "f_aceptado": 0.06, "f_rechazado": 0.06, // Tipo 8
    "display": "La próxima semana dará lugar la feria anual en %randPA de videojuegos y se espera que vengan %randR asistentes de todos los rincones del mundo"}, // Tipo 8
    {"p": 0.10, "contagios": 1.17, "f_aceptado": 0.06, "f_rechazado": 0.06, // Tipo 9
    "display": "La próxima semana dará lugar la feria anual en %randPA de coches y se espera que vengan %randR asistentes de todos los rincones del mundo"}  // Tipo 9
];

var eventRanges = [
    [40000, 70000],
    [14000, 35000],
    [500, 5000],
    [30000, 50000],
    [7500, 7500],
    [80000, 150000],
    [80000, 150000],
    [80000, 150000],
    [80000, 150000]
]

var tenistas = [
    "Rager Feederer",
    "Raphael Nada",
    "Peter Lapras",
    "Novako Djakavac",
    "Roder Laverg",
    "Bjorn Borges",
    "Ivan Landel",
    "Jimmy Connors",
    "Andrei Pegassi",
    "Jhon McEnroel",
    "Matt Willander",
    "Stefane Edberga",
    "Boris Recked",
    "John Newcomand",
    "Ken Roosbell",
    "Guillermo Villa",
    "Jim Courtier",
    "Ando Murrai",
    "Jahn Codes",
    "Main Ashe",
    "Gustav Kertën",
    "Stanis Wawrïnku",
    "Ili Nastasha",
    "Patric Rift"
]

var cantantes = [
    "Rosalío",
    "Aitan",
    "Lol Indiga",
    "D. Tongona",
    "Birit",
    "Joan Magán",
    "Alexandro Sainz",
    "Leiba",
    "Daviz Visval",
    "Rels V",
    "Kizz Queo",
    "Bad Gial",
    "Estepa",
    "Velinda",
    "El pepe",
    "Ete Sëchh",
    "Ömãr Mantas",
    "Nicky Nicol",
    "Duko",
    "Kaidi Kaïn",
    "Anna Mëna",
    "Delafuentes",
    "Michael Delbarrio",
    "Dany Martinez",
    "Pablo Albarán"
]