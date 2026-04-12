class Creature {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;

        this.size = 40;

        this.isHopping = false;

        // One hop takes 20 frames
        this.hopProgress = 0;
        this.hopDuration = 20;

        // Frames to wait before next hop
        this.waitTimer = int(random(20, 60));
        this.hopHeight = random(10, 25);
    }

    startHop(targetX, targetY) {
        this.startX = this.x;
        this.startY = this.y;

        // Keep target within bounds
        this.targetX = constrain(targetX, 0, screenWidth);
        this.targetY = constrain(targetY, 80, screenHeight);

        this.isHopping = true;
        this.hopProgress = 0;
    }

    move() {
        if (!this.isHopping) {
            // Countdown until next hop
            this.waitTimer--;

            if (this.waitTimer <= 0) {
                if (currentTool === "sword") {
                    let d = dist(this.x, this.y, mouseX, mouseY);

                    if (d < 500) {
                        let dx = this.x - mouseX;
                        let dy = this.y - mouseY;

                        let length = sqrt(dx * dx + dy * dy);

                        if (length > 0) {
                            dx = dx / length;
                            dy = dy / length;
                        }

                        let hopDistance = map(d, 0, 500, 250, 20);

                        this.startHop(
                            this.x + dx * hopDistance,
                            this.y + dy * hopDistance
                        );
                    }
                    else {
                        // Otherwise hop in a random direction
                        this.startHop(this.x + random(-50, 50), this.y + random(-50, 50));
                    }

                }
                else {
                    // Otherwise hop in a random direction
                    this.startHop(this.x + random(-50, 50), this.y + random(-50, 50));
                }
            }
        } else {
            this.hopProgress++;

            // t is percentage of the hop completed (0 to 1)
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

        fill(0, 40);
        ellipse(this.x, this.y + this.size * 0.35, this.size * 0.8, this.size * 0.3);

        fill(100, 150, 255);
        noStroke();
        ellipse(this.x, this.y - bounce, this.size, this.size * 0.85);

    }

    update() {
        this.move();
        this.display();
    }
}

function drawCreatures() {
    for (let c of creatures) {
        c.update();
    }
}