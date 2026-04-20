screenWidth = 1300;
screenHeight = 1000;

buttonWidth = 90;
buttonHeight = 90;

topSpacingBetweenButtons = 50;
sideSpacingBetweenButtons = 50;

margin = 30;

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

  spawnCreatureIcon = loadImage('assets/ui/UI_spawncreature.png');
  spawnPlantIcon = loadImage('assets/ui/UI_spawnplant.png');
  spawnCreaturePressedIcon = loadImage('assets/ui/UI_spawncreature_press.png');
  spawnPlantPressedIcon = loadImage('assets/ui/UI_spawnplant_press.png');

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
    y: margin,
    width: buttonWidth,
    height: buttonHeight,
    image: spawnCreatureIcon,
    label: "Spawn Creature"
  };

  spawnPlantButton = {
    x: screenWidth / 2 + topSpacingBetweenButtons / 2,
    y: margin,
    width: buttonWidth,
    height: buttonHeight,
    image: spawnPlantIcon,
    label: "Spawn Plant"
  };

  swordButton = {
    x: margin,
    y: screenHeight / 2 - foodH / 2 - sideSpacingBetweenButtons - swordH,
    rotation: 45,
    width: buttonWidth,
    height: swordH,
    image: swordIcon,
  };

  foodButton = {
    x: margin,
    y: screenHeight / 2 - foodH / 2 - 10,
    width: buttonWidth,
    height: foodH,
    image: foodIcon,
  };

  waterButton = {
    x: margin,
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

  // ellipse(screenWidth / 2 + 50, screenHeight / 2 + 200, 1000, 300);

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

