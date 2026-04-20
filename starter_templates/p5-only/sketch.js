// CONFIG -----------------------------------------------------------------------
const SCREEN_WIDTH = 1300;
const SCREEN_HEIGHT = 1000;

const BUTTON_WIDTH = 90;
const BUTTON_HEIGHT = 90;

const TOP_BUTTON_SPACING = 50;
const SIDE_BUTTON_SPACING = 50;
const MARGIN = 30;

const ARENA = {
  x: SCREEN_WIDTH / 2 + 50,
  y: SCREEN_HEIGHT / 2 + 200,
  w: 1100,
  h: 400
};

// GAME STATE ----------------------------------------------------------------------
let creatures = [];
let plants = [];

let currentTool = "none";

// Buttons
let spawnCreatureButton;
let spawnPlantButton;
let swordButton;
let foodButton;
let waterButton;

// Assets
let swordIcon, swordIconEmpty;
let foodIcon, foodIconEmpty;
let waterIcon, waterIconEmpty;

let spawnCreatureIcon, spawnPlantIcon;
let spawnCreaturePressedIcon, spawnPlantPressedIcon;

let creatureBabyImages = [];
let creatureAdultImages = [];
let plantBabyImages = [];
let plantAdultImages = [];

// ASSET LOADING ----------------------------------------------------------------
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
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  noSmooth();

  const swordH = swordIcon.height / swordIcon.width * BUTTON_WIDTH;
  const foodH = foodIcon.height / foodIcon.width * BUTTON_WIDTH;
  const waterH = waterIcon.height / waterIcon.width * BUTTON_WIDTH;

  spawnCreatureButton = {
    x: (SCREEN_WIDTH / 2) - (BUTTON_WIDTH + TOP_BUTTON_SPACING / 2),
    y: MARGIN,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    image: spawnCreatureIcon,
    label: "Spawn Creature"
  };

  spawnPlantButton = {
    x: SCREEN_WIDTH / 2 + TOP_BUTTON_SPACING / 2,
    y: MARGIN,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    image: spawnPlantIcon,
    label: "Spawn Plant"
  };

  swordButton = {
    x: MARGIN,
    y: SCREEN_HEIGHT / 2 - foodH / 2 - SIDE_BUTTON_SPACING - swordH,
    rotation: 45,
    width: BUTTON_WIDTH,
    height: swordH,
    image: swordIcon,
  };

  foodButton = {
    x: MARGIN,
    y: SCREEN_HEIGHT / 2 - foodH / 2 - 10,
    width: BUTTON_WIDTH,
    height: foodH,
    image: foodIcon,
  };

  waterButton = {
    x: MARGIN,
    y: SCREEN_HEIGHT / 2 + foodH / 2 + SIDE_BUTTON_SPACING,
    width: BUTTON_WIDTH,
    height: waterH,
    image: waterIcon,
  };

  console.log("Setup complete");

}

function draw() {
  background(240);
  ellipse(ARENA.x, ARENA.y, ARENA.w, ARENA.h);

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

// HELPERS ----------------------------------------------------------------------
function isInsideArena(x, y) {
  let dx = x - ARENA.x;
  let dy = y - ARENA.y;

  let rx = ARENA.w / 2;
  let ry = ARENA.h / 2;

  return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
}

function randomPointInArena() {
  let x, y;

  do {
    x = random(ARENA.x - ARENA.w / 2, ARENA.x + ARENA.w / 2);
    y = random(ARENA.y - ARENA.h / 2, ARENA.y + ARENA.h / 2);
  } while (!isInsideArena(x, y));

  return { x, y };
}

function constrainToArena(x, y, margin = 0) {
  let dx = x - ARENA.x;
  let dy = y - ARENA.y;

  let rx = ARENA.w / 2 - margin;
  let ry = ARENA.h / 2 - margin;

  if (rx <= 0 || ry <= 0) {
    return { x: ARENA.x, y: ARENA.y };
  }

  let value = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);

  // already inside
  if (value <= 1) {
    return { x, y };
  }

  // project point back to ellipse edge
  let scale = 1 / sqrt(value);

  return {
    x: ARENA.x + dx * scale,
    y: ARENA.y + dy * scale
  };
}
