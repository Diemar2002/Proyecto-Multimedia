let muted = true;
let playMusic = false;

function alternateSound() {
    muted = !muted;
    if (muted) {
        document.getElementById("muteIcon").src = "./assets/icons/soundOFF.png";
        masterVolume(0);
    } else {
        document.getElementById("muteIcon").src = "./assets/icons/soundON.png";
        masterVolume(int(document.getElementById("volume").value) / 100);
    }
}

function changeVolume() {
    if (!muted) {
        masterVolume(int(document.getElementById("volume").value) / 100);
    }
}

function alternateMusic() {
    playMusic = !playMusic;
    if (playMusic)
        document.getElementById("muteMusic").src = "./assets/icons/musicON.png";
        // if (gameState == 1) {
        //     themeSong[0].play();
        //     themeSong[0].onended(() => {themeSong[1].loop();})
        // }
    else {
        document.getElementById("muteMusic").src = "./assets/icons/musicOFF.png";
        // if (gameState == 1) {
        //     themeSong.forEach(song => {
        //         song.stop();
        //     });
        // }
    }
}