const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var assetpath = "assets/";

var engine, world;
var canvas;
var player, playerBase;
var archer;
var backgroundImg, baseImg, playerImg;
var archerImg, arrowImg, boardImg;
var arrows = [];
var boards = [];

function preload() {
  backgroundImg = loadImage(assetpath + "background.png");
  baseImg = loadImage(assetpath + "base.png");
  playerImg = loadImage(assetpath + "player.png");
  archerImg = loadImage(assetpath + "playerArcher.png");
  arrowImg = loadImage(assetpath + "arrow.png");
  boardImg = loadImage(assetpath + "board.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  playerBase = new PlayerBase(200, 350, 180, 150);

  player = new Player(playerBase.body.position.x, playerBase.body.position.y - 160, 50, 180);

  archer = new PlayerArcher(player.body.position.x + 40, player.body.position.y - 40, 120, 120);

  // Create 3 target boards randomly
  for (var i = 0; i < 3; i++) {
    var board = new Board(random(width/2, width-100), random(100, height-100), 100);
    boards.push(board);
  }
}

function draw() { 
  background(backgroundImg);

  Engine.update(engine);
  playerBase.display(baseImg);
  player.display(playerImg);

  // Control archer to aim
  if (keyIsDown(DOWN_ARROW) && archer.body.angle < -45) {
    Matter.Body.setAngle(archer.body, archer.body.angle + 1);
  }

  if (keyIsDown(UP_ARROW) && archer.body.angle > -135) {
    Matter.Body.setAngle(archer.body, archer.body.angle - 1);
  }

  // Display all 3 boards
  boards[0].display(boardImg);
  boards[1].display(boardImg);
  boards[2].display(boardImg);
  
  // Display archer
  archer.display(archerImg);
  
  // Display arrow
  for (var i = 0; i < arrows.length; i++) {
    if (arrows[i]) {
      if (arrows[i].isOffScreen()) {
        arrows[i].removeFromWorld();
        arrows.splice(i, 1);
        i--;
      }
      else {
        arrows[i].checkHit(boards[0]);
        arrows[i].checkHit(boards[1]);
        arrows[i].checkHit(boards[2]);
        arrows[i].display(arrowImg);
      }
    }
  }


  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  // Instruction
  textSize(20);
  textStyle(BOLD);
  fill("white");
  text("Up & Down arrow : adjust archer", 170, 20);
  text("Right arrow : shoot arrow", 170, 40);
  
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    var posX = player.body.position.x + 100;
    var posY = player.body.position.y - 40;
    var arrow = new PlayerArrow(posX,  posY, 120, 20);
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, archer.body.angle + 88);
    arrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    var archerAngle = archer.body.angle;
    arrows[arrows.length - 1].shoot(archerAngle);
  }
}