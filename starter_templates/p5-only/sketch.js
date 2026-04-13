screenWidth = 1300;
screenHeight = 1000;

buttonWidth = 70;
buttonHeight = 70;

topSpacingBetweenButtons = 50;
sideSpacingBetweenButtons = 50;

sideMargin = 30;

let creatures = [];
let plants = [];

let spawnCreatureButton;
let spawnPlantButton;

let currentTool = "none";

let creatureBabyImages = [];
let creatureAdultImages = [];

// Loading assets (images, sounds, etc.) 
function preload() {
  swordIcon = loadImage('assets/sword.png');
  foodIcon = loadImage('assets/food.png');
  creatureBabyImages[0] = loadImage('assets/creature_1_baby.png');
  creatureAdultImages[0] = loadImage('assets/creature_1_adult.png');
  creatureBabyImages[1] = loadImage('assets/creature_2_baby.png');
  creatureAdultImages[1] = loadImage('assets/creature_2_adult.png');
  creatureBabyImages[2] = loadImage('assets/creature_3_baby.png');
  creatureAdultImages[2] = loadImage('assets/creature_3_adult.png');
}


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
    x: sideMargin,
    y: screenHeight / 2 - buttonHeight / 2 - sideSpacingBetweenButtons - buttonHeight,
    width: buttonWidth,
    height: buttonHeight,
    image: swordIcon,
    label: "S"
  };

  foodButton = {
    x: sideMargin,
    y: screenHeight / 2 - buttonHeight / 2,
    width: buttonWidth,
    height: buttonHeight,
    image: foodIcon,
    label: "F"
  };

  waterButton = {
    x: sideMargin,
    y: screenHeight / 2 + buttonHeight / 2 + sideSpacingBetweenButtons,
    width: buttonWidth,
    height: buttonHeight,
    label: "W"
  };

  console.log("Setup complete");

}

function draw() {
  background(240);

  drawPlants();
  drawCreatures();
  drawUI();

  if (currentTool === "sword") {
    drawSwordCursor();
  } else if (currentTool === "food") {
    drawFoodCursor();
  } else if (currentTool === "water") {
    drawWaterCursor();
  } else if (currentTool === "none") {
    cursor();
  }
}

function mousePressed() {
  // Button Interaction 
  if (isInsideButton(mouseX, mouseY, spawnCreatureButton)) {
    currentTool = "none";
    creatures.push(new Creature(random(screenWidth), random(screenHeight)));
  } else if (isInsideButton(mouseX, mouseY, spawnPlantButton)) {
    currentTool = "none";
    plants.push(new Plant(random(screenWidth), random(screenHeight)));
  } else if (isInsideButton(mouseX, mouseY, swordButton)) {
    if (currentTool === "sword") {
      currentTool = "none";
      console.log("Sword button deselected");
    } else {
      currentTool = "sword";
      console.log("Sword button clicked");
    }
  } else if (isInsideButton(mouseX, mouseY, foodButton)) {
    currentTool = "food";
    console.log("Food button clicked");

  } else if (isInsideButton(mouseX, mouseY, waterButton)) {
    currentTool = "water";
    console.log("Water button clicked");
  }

  // Creature Interaction
  if (currentTool === "food") {
    for (let creature of creatures) {
      if (creature.isClicked(mouseX, mouseY)) {
        console.log("Creature clicked");
        creature.feed();
        currentTool = "none";
        break;
      }
    }
  }

}