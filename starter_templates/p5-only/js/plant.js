class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 75;
        this.adultSize = 120;
        this.stage = "baby"; // can be "baby" or "adult"
        this.type = int(random(3)); // 0, 1, or 2 for different plant types
        this.overwatered = 0;
        this.isAlive = true;
        this.deathTimer = 0;
    }

    display() {
        let img;
        if (this.stage === "baby") {
            img = plantBabyImages[this.type];
        } else {
            img = plantAdultImages[this.type];
        }

        if (!this.isAlive) {
            this.deathTimer++;
            let alpha = map(this.deathTimer, 100, 240, 255, 0);
            tint(255, alpha);
            img = plantDeadImages[this.type];
        }

        // Shadow
        fill(0, 40);
        ellipse(this.x, this.y + (img.height / img.width) * this.size * 0.4, this.size * 0.8, this.size * 0.3);
        noStroke();

        push();
        imageMode(CENTER);
        image(img, this.x, this.y, this.size, (img.height / img.width) * this.size);
        pop();
        noTint();
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size;
    }

    water() {
        if (this.size < this.adultSize + 35) {
            this.size += 5;
        }

        if (this.size >= this.adultSize && this.stage === "baby") {
            plantGrowSfx.play();
            this.stage = "adult";
        }
        else if (this.stage === "adult" && this.size >= this.adultSize + 30) {
            this.overwatered++;
        }

        if (this.overwatered > 7) {
            this.die();
        }

    }

    die() {
        this.isAlive = false;
        plantGrowSfx.play();
    }
}

function drawPlants() {
    for (let i = plants.length - 1; i >= 0; i--) {
        let plant = plants[i];
        plant.display();

        // remove after 60 frames (~1 second)
        if (!plant.isAlive && plant.deathTimer > 240) {
            plants.splice(i, 1);
        }
    }
}