function drawUI() {
    drawButton(spawnCreatureButton);
    drawButton(spawnPlantButton);
    drawButton(swordButton);
    drawButton(foodButton);
    drawButton(waterButton);
}

function drawButton(button) {
    fill(200);
    rect(button.x, button.y, button.width, button.height);
    fill(0);
    textAlign(CENTER, CENTER);
    text(button.label, button.x + button.width / 2, button.y + button.height / 2);
}

function isInsideButton(mx, my, button) {
    return (
        mx > button.x &&
        mx < button.x + button.width &&
        my > button.y &&
        my < button.y + button.height
    );
}