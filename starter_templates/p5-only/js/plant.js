class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 90;
        this.adultSize = 120;
        this.stage = "baby"; // can be "baby" or "adult"
        this.type = int(random(3)); // 0, 1, or 2 for different plant types
    }

    display() {
        let img;
        if (this.stage === "baby") {
            img = plantBabyImages[this.type];
        } else {
            img = plantAdultImages[this.type];
        }


        // Shadow
        fill(0, 40);
        ellipse(this.x, this.y + (img.height / img.width) * this.size * 0.4, this.size * 0.8, this.size * 0.3);
        noStroke();

        image(img, this.x, this.y, this.size, (img.height / img.width) * this.size);
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size;
    }

    water() {
        this.size += 5;
        if (this.size >= this.adultSize) {
            this.stage = "adult";

        }
    }

}

function drawPlants() {
    for (let plant of plants) {
        plant.display();
    }
}