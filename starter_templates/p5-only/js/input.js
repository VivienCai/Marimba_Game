function mousePressed() {
    if (handleTopButtons()) return;
    if (handleSideButtons()) return;
    if (handleCreatureInteractions()) return;
    if (handlePlantInteractions()) return;
}

// Button Spawn Interaction 
function handleTopButtons() {
    if (isInsideButton(mouseX, mouseY, spawnCreatureButton)) {
        resetIcons();
        currentTool = "none";
        creatures.push(new Creature(random(screenWidth), random(screenHeight)));
        return true;
    } else if (isInsideButton(mouseX, mouseY, spawnPlantButton)) {
        resetIcons();
        currentTool = "none";
        plants.push(new Plant(random(screenWidth), random(screenHeight)));
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
            swordButton.image = swordIconEmpty;
            currentTool = "sword";
            console.log("Sword button clicked");
        }

        return true;
    } else if (isInsideButton(mouseX, mouseY, foodButton)) {
        resetIcons();
        if (currentTool === "food") {
            currentTool = "none";
            console.log("Food button deselected");
        } else {
            foodButton.image = foodIconEmpty;
            currentTool = "food";
            console.log("Food button clicked");
        }
        return true;

    } else if (isInsideButton(mouseX, mouseY, waterButton)) {
        resetIcons();
        if (currentTool === "water") {
            currentTool = "none";
            console.log("Water button deselected");
        } else {
            waterButton.image = waterIconEmpty;
            currentTool = "water";
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
                console.log("Creature clicked");
                creature.feed();
                // currentTool = "none";
                break;
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
