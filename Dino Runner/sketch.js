var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, cloudsGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesGroup;
var score;
var play = 1;
var end = 0;
var gameState = play;
var gameOverImg, restartImg;
var jumpSound, checkPointSound, dieSound;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600, 300);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  gameOver.scale = 2;  
  restart.scale = 0.5;
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200, 290, 400, 10);
  invisibleGround.visible = false;
  score = 0; 
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  trex.setCollider("circle", 0, 0, 40); 
}
function draw() {
  background("black");
  text("Score: "+ score, 500,50);
  //start
  //start c-13 coding here
  if (gameState === play){
    score = score + Math.round(frameCount/60); 
    console.log(ground.x);
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -(4 + 3* score/100);
    if (ground.x<0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 230) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    trex.velocityY = trex.velocityY + 0.5;
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = end;
      jumpSound.play();
      //gamestate = end;
      //dieSound.play();
    }
    if(score>0 && score % 1000 === 0){
      checkPointSound.play();
    }
  }
  else if(gameState === end){
    gameOver.visible = true;
    restart.visible =   true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  // stop c-13 coding here
  //stop
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
  trex.changeAnimation("running", trex_running);
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  ground.velocityX = -(4 + 2 * score/100);
}
function spawnClouds(){
  if (frameCount % 60 === 0){
    cloud = createSprite(600, 100, 20, 10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10, 100));
    cloud.scale = 0.5;
    cloud.lifetime = 200;
    cloud.velocityX = -3;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600, 255, 10, 40);
    obstacle.velocityX = -(7 + score/3000);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }
    obstacle.scale = 0.8;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}