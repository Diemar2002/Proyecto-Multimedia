const barSpeed = 50;
const barWidth = 25;
const barHeight = 1;

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class StatusBar {
    constructor(min, max, start, color, position) {
        this.min = min;
        this.max = max;
        this.value = start;
        this.valueDisplayed = start;
        this.color = color;
        this.position = position;
    }

    update() {
        if (this.value < 0)
            this.value = 0
        else if (this.value > this.max)
            this.value = this.max;

        let dir = (this.valueDisplayed < this.value) ? 1:-1;
        let speed = Math.abs(this.value - this.valueDisplayed) + barSpeed / 5;
        if (speed > barSpeed)
            speed = barSpeed;

        this.valueDisplayed += dir * speed * deltaTime / 1000;
    }

    render() {
        strokeWeight(barHeight * width / 100);
        strokeCap(ROUND);
        stroke(this.color.r - 127, this.color.g - 127, this.color.b - 127);
        let left = (this.position.x * width / 100) - (barWidth * width / 100) / 2;
        let right = (this.position.x * width / 100) + (barWidth * width / 100) / 2;
        let y = this.position.y * height / 100;
        line(left, y, right, y);
        stroke(this.color.r, this.color.g, this.color.b);
        line(left, y, left + (this.valueDisplayed / (this.max - this.min)) * (right - left), y);
    }
}

// Contagios
class Provincia {
    constructor(name, population) {
        this.name = name;
        this.population = population;
        this.contagios = 0;
        this.cercanas = new Array();
    }
}

var provincias = new Array();
let nombresProvincias = [
    // Región de Murcia
    "Murcia",
    // Principado de Asturias
    "Asturias",
    // País Vasco
    "Vizcaya", "Guipúzcoa", "Álava",
    // Navarra
    "Navarra",
    // Melilla
    "Melilla",
    // La Rioja
    "La Rioja",
    // Islas Baleares
    "Baleares", 
    // Galicia
    "A Coruña", "Pontevedra", "Lugo", "Ourense",
    // Extremadura
    "Badajoz", "Cáceres",
    // Comunidad Valenciana
    "Valencia", "Alicante", "Castellón",
    // Comunidad de Madrid
    "Madrid",
    // Ceuta
    "Ceuta", 
    // Cataluña
    "Barcelona", "Tarragona", "Girona", "Lleida",
    // Castilla La Mancha
    "Toledo", "Ciudad Real", "Albacete", "Guadalajara", "Cuenca",
    // Castilla y León
    "Valladolid", "León", "Burgos", "Salamanca", "Zamora", "Palencia", "Ávila", "Segovia", "Soria",
    // Cantabria
    "Cantabria",
    // Canarias
    "Las Palmas", "Santa Cruz de Tenerife",
    // Aragón
    "Zaragoza", "Huesca", "Teruel",
    // Andalucía
    "Sevilla", "Málaga", "Cádiz", "Granada", "Córdoba", "Almería", "Jaén", "Huelva"
];

let poblacionesProvincias = [
    1493898,
    1022800,
    1152651, 723576, 331549,
    654214,
    86487,
    316798,
    1149460,
    1119596, 942665, 329587, 307651,
    673559, 394151, 
    2565124, 1858683, 579962,
    6693394,
    84477,
    5664579, 804664, 771044, 434930,
    694844, 495761, 388167, 257762, 196329,
    519546, 460001, 356958, 330119, 172539, 160980, 157640, 153129, 88636,
    581078, 
    1120596, 1032983,
    964693, 220461, 134137,
    1942380, 1661785, 1240155, 914678, 782979, 716820, 663564, 521870
];

cercaniaProvincias = [
    [49, 47, 26, 16],
    [11, 30, 38],
    [38, 31, 4, 3],
    [2, 5, 4],
    [31, 7, 5, 3, 2],
    [42, 3, 4, 7, 41],
    [], // Melilla
    [37, 31, 4, 5, 41],
    [], // Baleares
    [10, 11],
    [12, 11, 9],
    [12, 30, 1, 9, 10],
    [33, 30, 11, 10],
    [51, 44, 48, 25, 24, 35, 32],
    [13, 25, 24, 35, 32],
    [16, 26, 28, 43, 17],
    [0, 26, 15],
    [15, 43, 21],
    [24, 28, 27, 36, 35],
    [], // Ceuta
    [21, 23, 22],
    [17, 43, 41, 23, 20],
    [20, 23],
    [42, 41, 21, 20, 22],
    [25, 28, 18, 35, 14, 13],
    [50, 26, 28, 24, 14, 13, 48],
    [47, 0, 16, 15, 28, 25, 50],
    [28, 43, 41, 37, 36, 18],
    [25, 26, 15, 43, 27, 18, 24],
    [35, 36, 31, 34, 30, 33, 32],
    [33, 29, 34, 38, 1, 11, 12],
    [36, 37, 7, 4, 2, 38, 34, 29],
    [14, 35, 29, 33],
    [32, 29, 30, 12],
    [29, 31, 38, 30],
    [24, 18, 36, 29, 32, 14],
    [18, 27, 37, 31, 29, 35],
    [27, 41, 7, 31, 36],
    [34, 31, 2, 1, 30],
    [40], // Las palmas
    [39], // Santa Cruz de Tenerife
    [43, 21, 23, 42, 5, 7, 37, 27],
    [5, 41, 23],
    [15, 17, 21, 41, 27, 28],
    [46, 45, 48, 13, 51],
    [46, 44, 48, 47],
    [45, 44, 51],
    [45, 48, 50, 26, 0, 49],
    [44, 45, 47, 50, 25, 13],
    [47, 0],
    [47, 26, 25, 48],
    [46, 44, 13],
    ];

for (i = 0; i < 52; i++) {
    provincias.push(new Provincia(nombresProvincias[i], poblacionesProvincias[i]));
    provincias[i].cercanas = cercaniaProvincias[i];
}
