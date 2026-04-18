function drawUI() {
    drawButton(spawnCreatureButton);
    drawButton(spawnPlantButton);
    drawButton(swordButton);
    drawButton(foodButton);
    drawButton(waterButton);
}

function drawButton(button) {
    fill(200);

    if (button.image) {
        imageMode(CENTER);
        image(button.image, button.x + button.width / 2, button.y + button.height / 2, button.width, button.height);
    } else {
        fill(0);
        textAlign(CENTER, CENTER);
        text(button.label, button.x + button.width / 2, button.y + button.height / 2);
    }
}

function isInsideButton(mx, my, button) {
    return (
        mx > button.x &&
        mx < button.x + button.width &&
        my > button.y &&
        my < button.y + button.height
    );
}

function drawSwordCursor() {
    noCursor();

    push();
    translate(mouseX, mouseY);
    rotate(PI / 4);
    imageMode(CENTER);
    image(swordIcon, 0, 0, swordButton.width, swordButton.height);
    pop();

}

function drawFoodCursor() {
    noCursor();
    imageMode(CENTER);
    image(foodIcon, mouseX, mouseY, foodButton.width, foodButton.height);
}

function drawWaterCursor() {
    noCursor();
    imageMode(CENTER);
    image(waterIcon, mouseX, mouseY, waterButton.width, waterButton.height);
}