// CONFIG -----------------------------------------------------------------------
const SCREEN_WIDTH = 1500;
const SCREEN_HEIGHT = 1050;

const BUTTON_WIDTH = 90;
const BUTTON_HEIGHT = 90;

const TOP_BUTTON_SPACING = 50;
const SIDE_BUTTON_SPACING = 50;
const MARGIN = 30;

const ARENA = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2 + 190,
  w: 1250,
  h: 450
};

// GAME STATE ----------------------------------------------------------------------
let creatures = [];
let plants = [];

let currentTool = "none";
let paused = false;

// Buttons
let spawnCreatureButton;
let spawnPlantButton;
let swordButton;
let foodButton;
let waterButton;

// Assets
let bgmusic, spawnSfx, waterSfx, swordSfx, foodSfx, creatureJumpSfx, plantGrowSfx, creatureGrowSfx, creatureDeathSfx;

let bg1, bg2, bg3, mg4, mg5, mg6, fg7, fg8, fg9, fg10;

let bg2clouds, mg4fog, mg5clouds, fg7fog, fg8clouds;

let swordIcon, swordIconEmpty;
let foodIcon, foodIconEmpty;
let waterIcon, waterIconEmpty;

let spawnCreatureIcon, spawnPlantIcon;
let spawnCreaturePressedIcon, spawnPlantPressedIcon;

let creatureBabyImages = [];
let creatureAdultImages = [];
let plantBabyImages = [];
let plantAdultImages = [];
let plantDeadImages = [];
let deadCreatureImage = [];

// ASSET LOADING ----------------------------------------------------------------
function preload() {
  soundFormats('mp3', 'wav');

  bgmusic = loadSound("assets/audio/Bg_Music.mp3");
  spawnSfx = loadSound("assets/audio/UI_Spawn_Sound.wav");
  waterSfx = loadSound("assets/audio/UI_Water_Sound.wav");
  swordSfx = loadSound("assets/audio/UI_Sword_Sound.wav");
  foodSfx = loadSound("assets/audio/UI_Food_Sound.wav");
  creatureJumpSfx = loadSound("assets/audio/Creature_Jump.wav");
  plantGrowSfx = loadSound("assets/audio/Plant_Grow.wav");
  creatureGrowSfx = loadSound("assets/audio/Animal_Grow.mp3");
  creatureDeathSfx = loadSound("assets/audio/Kill_Sound.wav");

  bg1 = loadImage("assets/background/1_BG_Sky.png");
  bg2 = loadImage("assets/background/2_BG_Cloud.png");
  bg3 = loadImage("assets/background/3_BG_Mountains.png");
  mg4 = loadImage("assets/background/4_MG_Fog.png");
  mg5 = loadImage("assets/background/5_MG_Cloud.png");
  mg6 = loadImage("assets/background/6_MG_Mountains.png");
  fg7 = loadImage("assets/background/7_FG_Fog.png");
  fg8 = loadImage("assets/background/8_FG_Cloud.png");
  fg9 = loadImage("assets/background/9_FG_Field.png");
  fg10 = loadImage("assets/background/10_FG_trees.png");

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

  plantDeadImages[0] = loadImage('assets/tree_1_dead.png');
  plantDeadImages[1] = loadImage('assets/tree_2_dead.png');
  plantDeadImages[2] = loadImage('assets/tree_3_dead.png');

  deadCreatureImage = loadImage('assets/cooked_food_blue.png');
}


function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  noSmooth();

  outputVolume(0.09);
  creatureJumpSfx.setVolume(0.4);
  bgmusic.setVolume(0.3);


  bgmusic.setLoop(true);
  bgmusic.play();

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

  foodButtonEmpty = {
    x: MARGIN - 5,
    y: SCREEN_HEIGHT / 2 - foodH / 2 - 15,
    width: BUTTON_WIDTH + 10,
    height: foodH + 10,
    image: foodIconEmpty,
  };

  waterButtonEmpty = {
    x: MARGIN - 5,
    y: SCREEN_HEIGHT / 2 + foodH / 2 + SIDE_BUTTON_SPACING - 5,
    width: BUTTON_WIDTH + 10,
    height: waterH + 10,
    image: waterIconEmpty,
  };

  swordButtonEmpty = {
    x: MARGIN - 5,
    y: SCREEN_HEIGHT / 2 - foodH / 2 - SIDE_BUTTON_SPACING - swordH - 5,
    rotation: 45,
    width: BUTTON_WIDTH + 10,
    height: swordH + 10,
    image: swordIconEmpty,
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

  bg2clouds = {
    x1: -500,
    x2: SCREEN_WIDTH * 2 - 500,
    speed: 0.1,
  }

  mg4fog = {
    x1: 0,
    x2: SCREEN_WIDTH * 2,
    speed: 0.5,
  }

  mg5clouds = {
    x1: - 300,
    x2: SCREEN_WIDTH * 2 - 300,
    speed: 0.2,
  }

  fg7fog = {
    x1: 0,
    x2: SCREEN_WIDTH * 2,
    speed: 0.8,
  }

  fg8clouds = {
    x1: -100,
    x2: SCREEN_WIDTH * 2 - 100,
    speed: 0.6,
  }


  console.log("Setup complete");

}

function draw() {
  if (paused) {
    image(lastFrame, 0, 0);
    fill(247, 255, 254, 100);
    rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    bgmusic.pause();
  } else {
    if (!bgmusic.isPlaying()) {
      bgmusic.play();
    }
    background(240);

    drawBackground();
    // fill(100, 100, 100, 100);
    // ellipse(ARENA.x, ARENA.y, ARENA.w, ARENA.h);
    drawPlants();
    drawCreatures();
    drawLayer(fg10, 0.8); // foreground
    drawUI();

    push();
    imageMode(CENTER);
    if (currentTool === "sword") {
      drawSwordCursor();
    } else if (currentTool === "food") {
      drawFoodCursor();
    } else if (currentTool === "water") {
      drawWaterCursor();
    } else if (currentTool === "none") {
      cursor();
    }
    pop();
    lastFrame = get();
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
