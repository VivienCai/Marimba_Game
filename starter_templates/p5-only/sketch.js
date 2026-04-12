screenWidth = 1300;
screenHeight = 1000;

buttonWidth = 100;
buttonHeight = 100;

topSpacingBetweenButtons = 50;
sideSpacingBetweenButtons = 50;

let creatures = [];
let plants = [];


let spawnCreatureButton;
let spawnPlantButton;

function setup() {
  createCanvas(screenWidth, screenHeight);

  spawnCreatureButton = {
    x: (screenWidth / 2) - (buttonWidth + topSpacingBetweenButtons / 2),
    y: 10,
    width: buttonWidth,
    height: buttonHeight,
    label: "Spawn Creature"
  };

  spawnPlantButton = {
    x: screenWidth / 2 + topSpacingBetweenButtons / 2,
    y: 10,
    width: buttonWidth,
    height: buttonHeight,
    label: "Spawn Plant"
  };

  swordButton = {
    x: 10,
    y: screenHeight / 2 - buttonHeight / 2 - sideSpacingBetweenButtons - buttonHeight,
    width: buttonWidth,
    height: buttonHeight,
    label: "S"
  };

  foodButton = {
    x: 10,
    y: screenHeight / 2 - buttonHeight / 2,
    width: buttonWidth,
    height: buttonHeight,
    label: "F"
  };

  waterButton = {
    x: 10,
    y: screenHeight / 2 + buttonHeight / 2 + sideSpacingBetweenButtons,
    width: buttonWidth,
    height: buttonHeight,
    label: "W"
  };

}

function draw() {
  background(240);

  drawPlants();
  drawCreatures();
  drawUI();
}

function mousePressed() {
  if (isInsideButton(mouseX, mouseY, spawnCreatureButton)) {
    creatures.push(new Creature(random(screenWidth), random(screenHeight)));
  } else if (isInsideButton(mouseX, mouseY, spawnPlantButton)) {
    plants.push(new Plant(random(screenWidth), random(screenHeight)));
  } else if (isInsideButton(mouseX, mouseY, swordButton)) {
    console.log("Sword button clicked");
  } else if (isInsideButton(mouseX, mouseY, foodButton)) {
    console.log("Food button clicked");
  } else if (isInsideButton(mouseX, mouseY, waterButton)) {
    console.log("Water button clicked");
  }
}