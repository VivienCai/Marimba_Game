function mousePressed() {
    if (paused) {
        if (detectPausedClick()) return;
    }
    else {
        if (detectPausedClick()) return;
        if (handleTopButtons()) return;
        if (handleSideButtons()) return;
        if (handleCreatureInteractions()) return;
        if (handlePlantInteractions()) return;
    }
}

// Button Spawn Interaction 
function handleTopButtons() {
    if (isInsideButton(mouseX, mouseY, spawnCreatureButton)) {
        resetIcons();
        currentTool = "none";

        let pos = randomPointInArena();
        creatures.push(new Creature(pos.x, pos.y));
        spawnSfx.play();
        return true;
    } else if (isInsideButton(mouseX, mouseY, spawnPlantButton)) {
        resetIcons();
        currentTool = "none";
        let pos = randomPointInArena();
        plants.push(new Plant(pos.x, pos.y));
        spawnSfx.play();
        return true;
    }
    return false;
}

function handleSideButtons() {
    // Button Tool Interaction
    if (isInsideButton(mouseX, mouseY, swordButton)) {
        resetIcons();
        if (currentTool === "sword") {
            currentTool = "none";
            console.log("Sword button deselected");
        } else {
            swordButton.image = null;
            currentTool = "sword";
            swordSfx.play();
            console.log("Sword button clicked");
        }

        return true;
    } else if (isInsideButton(mouseX, mouseY, foodButton)) {
        resetIcons();
        if (currentTool === "food") {
            currentTool = "none";
            console.log("Food button deselected");
        } else {
            foodButton.image = null;
            currentTool = "food";
            foodSfx.play();
            console.log("Food button clicked");
        }
        return true;

    } else if (isInsideButton(mouseX, mouseY, waterButton)) {
        resetIcons();
        if (currentTool === "water") {
            currentTool = "none";
            console.log("Water button deselected");
        } else {
            waterButton.image = null;
            currentTool = "water";
            waterSfx.play();
            console.log("Water button clicked");
        }
        return true;
    }
    return false;
}

function handleCreatureInteractions() {
    // Creature Interaction
    if (currentTool === "food") {
        for (let creature of creatures) {
            if (creature.isClicked(mouseX, mouseY)) {
                if (creature.isAlive) {
                    console.log("Creature clicked");
                    creature.feed();
                    // currentTool = "none";
                    break;
                }
            }
        }
        return true;
    }
    else if (currentTool === "sword") {
        for (let creature of creatures) {
            if (creature.isClicked(mouseX, mouseY)) {
                if (creature.isAlive && creature.stage === "adult") {
                    console.log("Creature killed");
                    creature.die();
                    // currentTool = "none";
                    break;
                }
            }
        }
        return true;
    }
    return false;
}

function handlePlantInteractions() {
    // Plant Interaction
    if (currentTool === "water") {
        for (let plant of plants) {
            if (plant.isClicked(mouseX, mouseY)) {
                console.log("Plant clicked");
                plant.water();
                // currentTool = "none";
                break;
            }
        }
        return true;
    }
    return false;
}

function resetIcons() {
    swordButton.image = swordIcon;
    foodButton.image = foodIcon;
    waterButton.image = waterIcon;
}

function detectPausedClick() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 25) {
        paused = !paused;
        return true;
    }
    return false;
}