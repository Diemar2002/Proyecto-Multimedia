function updateCards() {
    if (day == 15) {
        availableCards.push(new Card(null));
        availableCards[0].text = "Se detectan los primeros casos en " + starter.name;
    }

    if (availableCards.length == 0) {
        prevMicroState = -1;
        microState = 0;
    }
}