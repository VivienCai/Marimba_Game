screenWidth = 400;
screenHeight = 400;

let creatures = [];
let plants = [];


let spawnCreatureButton;
let spawnPlantButton;

function setup() {
  createCanvas(screenWidth, screenHeight);

  spawnCreatureButton = {
    x: 10,
    y: 10,
    width: 120,
    height: 30,
    label: "Spawn Creature"
  };

  spawnPlantButton = {
    x: 250,
    y: 10,
    width: 120,
    height: 30,
    label: "Spawn Plant"
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
  }
}