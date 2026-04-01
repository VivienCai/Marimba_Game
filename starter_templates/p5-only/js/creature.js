class Creature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }
}

function drawCreatures() {
    for (let creature of creatures) {
        fill(255, 0, 0);
        ellipse(creature.x, creature.y, creature.size);
    }
}