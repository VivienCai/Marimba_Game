class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }
}

function drawPlants() {
    for (let plant of plants) {
        fill(0, 255, 0);
        ellipse(plant.x, plant.y, plant.size);
    }
}