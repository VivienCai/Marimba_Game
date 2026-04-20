screenWidth = 1300;
screenHeight = 1000;

buttonWidth = 90;
buttonHeight = 90;

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
let plantBabyImages = [];
let plantAdultImages = [];

// Loading assets (images, sounds, etc.) 
function preload() {
  swordIcon = loadImage('assets/ui/UI_sword.png');
  swordIconEmpty = loadImage('assets/ui/UI_sword_outline.png');
  foodIcon = loadImage('assets/ui/UI_food.png');
  foodIconEmpty = loadImage('assets/ui/UI_food_outline.png');
  waterIcon = loadImage('assets/ui/UI_water.png');
  waterIconEmpty = loadImage('assets/ui/UI_water_outline.png');

  creatureBabyImages[0] = loadImage('assets/creature_1_baby.png');
  creatureAdultImages[0] = loadImage('assets/creature_1_adult.png');
  creatureBabyImages[1] = loadImage('assets/creature_2_baby.png');
  creatureAdultImages[1] = loadImage('assets/creature_2_adult.png');
  creatureBabyImages[2] = loadImage('assets/creature_3_baby.png');
  creatureAdultImages[2] = loadImage('assets/creature_3_adult.png');

  plantBabyImages[0] = loadImage('assets/tree_1_seed.png');
  plantAdultImages[0] = loadImage('assets/tree_1_grown.png');
  plantBabyImages[1] = loadImage('assets/tree_2_seed.png');
  plantAdultImages[1] = loadImage('assets/tree_2_grown.png');
  plantBabyImages[2] = loadImage('assets/tree_3_seed.png');
  plantAdultImages[2] = loadImage('assets/tree_3_grown.png');
}


function setup() {
  let swordH = swordIcon.height / swordIcon.width * buttonWidth;
  let foodH = foodIcon.height / foodIcon.width * buttonWidth;
  let waterH = waterIcon.height / waterIcon.width * buttonWidth;


  createCanvas(screenWidth, screenHeight);
  noSmooth();

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
    y: screenHeight / 2 - foodH / 2 - sideSpacingBetweenButtons - swordH,
    rotation: 45,
    width: buttonWidth,
    height: swordH,
    image: swordIcon,
  };

  foodButton = {
    x: sideMargin,
    y: screenHeight / 2 - foodH / 2 - 10,
    width: buttonWidth,
    height: foodH,
    image: foodIcon,
  };

  waterButton = {
    x: sideMargin,
    y: screenHeight / 2 + foodH / 2 + sideSpacingBetweenButtons,
    width: buttonWidth,
    height: waterH,
    image: waterIcon,
  };

  console.log("Setup complete");

}

function draw() {
  background(240);

  drawPlants();
  drawCreatures();
  drawUI();

  ellipse(screenWidth / 2 + 50, screenHeight / 2 + 200, 1000, 300);

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
