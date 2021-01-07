
// Imágenes
var icons;
var mainMap;
var provinceMaps;

// Fuentes
var ubuntuLight;
var ubuntuRegular;
var ubuntuBold;

// sonidos
var themeSong;
var sounds;

// Shaders
var infectionsDisplayer;

function preload() {
    // return;
    // Carga de imágenes
    icons = loadArray(["icons/corona.png", "icons/dinero.png", "icons/enfadado.png", "icons/serio.png", "icons/feliz.png", "icons/carta.png", "icons/cardBorder.png", "icons/iconHolder.png", "icons/virus1.png", "icons/virus2.png"]);
    // Blur a las imágenes
    icons[8].filter(BLUR, 2);
    icons[9].filter(BLUR, 2);

    mainMap = loadImage("./assets/maps/mapa principal.png");
    densityMap = loadImage("./assets/maps/mapa de densidad.png");
    // Carga de fuentes
    ubuntuLight = loadFont("./assets/vendor/Ubuntu-L.ttf");
    ubuntuRegular = loadFont("./assets/vendor/Ubuntu-R.ttf");
    ubuntuBold = loadFont("./assets/vendor/Ubuntu-B.ttf");

    // Carga de shaders
    infectionsDisplayer = loadShader("./assets/shaders/basicVertex.vert", "./assets/shaders/contagios.frag");

    // Carga de sonidos
    soundFormats('wav');
    themeSong = [
        loadSound("./assets/sound/intro.wav"),
        loadSound("./assets/sound/loop.wav"),
        loadSound("./assets/sound/end.wav")
    ];
    sounds = [
        loadSound("./assets/sound/select.wav"),
        loadSound("./assets/sound/cardFlip.wav"),
        loadSound("./assets/sound/cardPick.wav"),
        loadSound("./assets/sound/cardPlace.wav"),
        loadSound("./assets/sound/stamp.wav")
    ];

    // Carga de las provincias (Imagen)
    provinceMaps = loadArray([
    'maps/España/Murcia/Murcia.png',
    
    'maps/España/Asturias/Asturias.png',
    
    'maps/España/Pais Vasco/Vizcaya.png',
    'maps/España/Pais Vasco/Guipuzcua.png',
    'maps/España/Pais Vasco/Alava.png',
    
    'maps/España/Navarra/Navarra.png',
    
    'maps/España/Ceuta y Melilla/Melilla.png', 
    
    'maps/España/La Rioja/La Rioja.png',
    
    'maps/España/Islas Baleares/Baleares.png',
    
    'maps/España/Galicia/La Coruña.png',
    'maps/España/Galicia/Pontevedra.png',
    'maps/España/Galicia/Lugo.png',
    'maps/España/Galicia/Ourense.png',
  
    'maps/España/Extremadura/Badajoz.png',
    'maps/España/Extremadura/Caceres.png',
  
    'maps/España/Comunidad Valenciana/Valencia.png',
    'maps/España/Comunidad Valenciana/Alicante.png',
    'maps/España/Comunidad Valenciana/Castellon.png',
  
    'maps/España/Madrid/Madrid.png',
  
    'maps/España/Ceuta y Melilla/Ceuta.png',
  
    'maps/España/Cataluña/Barcelona.png',
    'maps/España/Cataluña/Tarragona.png',
    'maps/España/Cataluña/Girona.png',
    'maps/España/Cataluña/Lleida.png',
    
    'maps/España/Castilla la Mancha/Toledo.png',
    'maps/España/Castilla la Mancha/Ciudad Real.png',
    'maps/España/Castilla la Mancha/Albacete.png',
    'maps/España/Castilla la Mancha/Guadalajara.png',
    'maps/España/Castilla la Mancha/Cuenca.png',
  
    'maps/España/Castilla y Leon/Valladolid.png',
    'maps/España/Castilla y Leon/Leon.png',
    'maps/España/Castilla y Leon/Burgos.png',
    'maps/España/Castilla y Leon/Salamanca.png',
    'maps/España/Castilla y Leon/Zamora.png',
    'maps/España/Castilla y Leon/Palencia.png',
    'maps/España/Castilla y Leon/Avila.png',
    'maps/España/Castilla y Leon/Segovia.png',
    'maps/España/Castilla y Leon/Soria.png',
  
    'maps/España/Cantabria/Cantabria.png',
  
    'maps/España/Canarias/Las Palmas.png',
    'maps/España/Canarias/Tenerife.png',
  
    'maps/España/Aragon/Zaragoza.png',
    'maps/España/Aragon/Huesca.png',
    'maps/España/Aragon/Teruel.png',
  
    'maps/España/Andalucia/Sevilla.png',
    'maps/España/Andalucia/Malaga.png',
    'maps/España/Andalucia/Cadiz.png',
    'maps/España/Andalucia/Granada.png',
    'maps/España/Andalucia/Cordoba.png',
    'maps/España/Andalucia/Almeria.png',
    'maps/España/Andalucia/Jaen.png',
    'maps/España/Andalucia/Huelva.png'
    ]);
}

function loadArray(filenames) {
    let buff = [];
    filenames.forEach(element => {
        buff.push(loadImage("./assets/" + element));
    });
    return buff;
}