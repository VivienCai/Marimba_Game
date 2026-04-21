class Creature {
    constructor(x, y) {
        let safePos = constrainToArena(x, y);

        this.x = safePos.x;
        this.y = safePos.y;

        this.startX = this.x;
        this.startY = this.y;
        this.targetX = this.x;
        this.targetY = this.y;

        this.size = 75;
        this.adultSize = 100;
        this.type = int(random(3));
        this.stage = "baby";
        this.isHopping = false;
        this.isAlive = true;

        this.hopProgress = 0;
        this.hopDuration = 20;

        this.waitTimer = int(random(20, 60));
        this.hopHeight = random(10, 25);
    }

    startHop(targetX, targetY) {
        this.startX = this.x;
        this.startY = this.y;

        // Keep hop target inside ellipse instead of screen rectangle
        let safeTarget = constrainToArena(targetX, targetY, this.size * 0.35);
        this.targetX = safeTarget.x;
        this.targetY = safeTarget.y;

        this.isHopping = true;
        this.hopProgress = 0;
    }

    move() {
        if (!this.isHopping) {
            this.waitTimer--;

            if (this.waitTimer <= 0) {
                if (currentTool === "sword" || currentTool === "food") {
                    let d = dist(this.x, this.y, mouseX, mouseY);

                    if (d < 500) {
                        let dx = this.x - mouseX;
                        let dy = this.y - mouseY;

                        let length = sqrt(dx * dx + dy * dy);

                        if (length > 0) {
                            dx = dx / length;
                            dy = dy / length;
                        }


                        if (currentTool === "sword") {
                            let hopDistance = map(d, 0, 500, 250, 20);
                            // if (this.size >= this.adultSize + 20) {
                            //     hopDistance = 0;
                            // }
                            this.startHop(
                                this.x + dx * hopDistance,
                                this.y + dy * hopDistance
                            );
                        } else if (currentTool === "food") {
                            this.startHop(
                                this.x - dx * 50,
                                this.y - dy * 50
                            );
                        }
                    } else {
                        this.startHop(
                            this.x + random(-50, 50),
                            this.y + random(-50, 50)
                        );
                    }
                } else {
                    this.startHop(
                        this.x + random(-50, 50),
                        this.y + random(-50, 50)
                    );
                }
            }
        } else {
            this.hopProgress++;

            let t = this.hopProgress / this.hopDuration;
            t = constrain(t, 0, 1);

            this.x = lerp(this.startX, this.targetX, t);
            this.y = lerp(this.startY, this.targetY, t);

            if (t >= 1) {
                this.isHopping = false;
                this.waitTimer = int(random(20, 60));
            }
        }
    }

    display() {
        let bounce = 0;

        if (this.isHopping) {
            let t = this.hopProgress / this.hopDuration;
            bounce = sin(t * PI) * this.hopHeight;
        }

        let img;
        if (!this.isAlive) {
            img = deadCreatureImage;
        }
        else if (this.stage === "baby") {
            img = creatureBabyImages[this.type];
        } else {
            img = creatureAdultImages[this.type];
        }

        if (this.isAlive) {
            fill(0, 40);
            ellipse(
                this.x,
                this.y + (img.height / img.width) * this.size * 0.55,
                this.size * 0.8,
                this.size * 0.3
            );
            noStroke();
        } else {
            fill(0, 40);
            ellipse(
                this.x,
                this.y + (img.height / img.width) * this.size * 0.4 - bounce,
                this.size * 0.8,
                this.size * 0.3
            );
            noStroke();
        }

        push();
        imageMode(CENTER);
        image(img, this.x, this.y - bounce, this.size, (img.height / img.width) * this.size);
        pop();
    }

    update() {
        if (this.isAlive) {
            this.move();
        }
        this.display();
    }

    isClicked(mx, my) {
        let bounce = 0;

        if (this.isHopping) {
            let t = this.hopProgress / this.hopDuration;
            bounce = sin(t * PI) * this.hopHeight;
        }

        let d = dist(mx, my, this.x, this.y - bounce);
        return d < this.size;
    }

    feed() {
        if (this.size < 120) {
            this.size += 5;
            if (this.size >= this.adultSize && this.stage === "baby") {
                this.stage = "adult";
                if (this.type === 2) {
                    this.size += 50;
                }
            }
        }
        else if (this.size < 170 && this.type === 2) {
            this.size += 5;
        }

    }

    die() {
        this.isAlive = false;
        this.size += 20;
    }
}

function drawCreatures() {
    for (let c of creatures) {
        c.update();
    }
}