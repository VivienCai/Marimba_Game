function drawUI() {
    updateTopButtonSprites();
    drawButton(spawnCreatureButton);
    drawButton(spawnPlantButton);
    drawButton(swordButton);
    drawButton(foodButton);
    drawButton(waterButton);
}

function drawButton(button) {
    fill(200);

    if (button.image) {
        if (button.rotation) {
            push();
            imageMode(CENTER);
            translate(button.x + button.width / 2, button.y + button.height / 2);
            rotate(radians(button.rotation));
            image(button.image, 0, 0, button.width - 20, button.height - 20);
            pop();
        }
        else {
            image(button.image, button.x, button.y, button.width, button.height);
        }

    } else {
        fill(0);
        textAlign(CENTER, CENTER);
        text(button.label, button.x + button.width / 2, button.y + button.height / 2);
    }
}

function isInsideButton(mx, my, button) {
    if (
        mx > button.x &&
        mx < button.x + button.width &&
        my > button.y &&
        my < button.y + button.height
    ) {
        console.log(button.x, button.x + button.width, button.y, button.y + button.height);
        console.log(mx, my);
        return true;
    }
    return false;
}

function drawSwordCursor() {
    noCursor();

    push();
    translate(mouseX, mouseY);
    rotate(PI / 4);
    imageMode(CENTER);
    image(swordIcon, 0, 0, swordButton.width - 20, swordButton.height - 20);
    pop();
}

function drawFoodCursor() {
    noCursor();
    push();
    imageMode(CENTER);
    pop();
    image(foodIcon, mouseX, mouseY, foodButton.width, foodButton.height);
}

function drawWaterCursor() {
    noCursor();
    push();
    imageMode(CENTER);
    pop();
    image(waterIcon, mouseX, mouseY, waterButton.width, waterButton.height);
}

function updateTopButtonSprites() {
    if (isInsideButton(mouseX, mouseY, spawnCreatureButton) && mouseIsPressed) {
        spawnCreatureButton.image = spawnCreaturePressedIcon;
    } else {
        spawnCreatureButton.image = spawnCreatureIcon;
    }

    if (isInsideButton(mouseX, mouseY, spawnPlantButton) && mouseIsPressed) {
        spawnPlantButton.image = spawnPlantPressedIcon;
    } else {
        spawnPlantButton.image = spawnPlantIcon;
    }
}