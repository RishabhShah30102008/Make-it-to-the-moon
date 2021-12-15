var INTRO = 1;
var AUTOMODE = 0;
var PLAY = false;
var END;
var WIN;
var gameState = INTRO;

var start, start0, start_Img;

var obstacle,obstacle1,obstacle2,obstacle3,obstacleImage, obstacleGroup;

var coin, coin1, coinImage,coin0, coinGroup;

var player, playerImage, player0;

var cloud, cloudImage, cloud0, cloudGroup;

var firstaid, firstaidImage, firstaid0, firstaidGroup;

var restart,restartImage, restart0;

var coinSound, coin1;

var collidedSound, collided;

var edges;

var spaceImage, spaceImg, space, moonImage, moonImg, moon;

var launchpad, launchpad_Imag, launchpad0;

var grass_sprite;

var star_Img, star;

var purchase_sprite, purchase_Img, purchase;

var score = 50;
var currentHeight = 0;
var cI = 0;

var claimSound, claim;

var launch_Sound, launch;

var win_Sound, win;

function preload(){

  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png");

  coinImage = loadImage("coin0.png");
  playerImage= loadAnimation("player0.png");
  cloudImage = loadAnimation("cloud0.png");
  firstaidImage = loadImage("firstaid0.png");
  launchpad_Imag = loadImage("launchpad0.png");
  purchase_Img = loadImage("purchase.png");

  restartImage = loadImage("restart0.png");

  spaceImage = loadImage("spaceImg.jpg");
  moonImage = loadImage("moonImg.jpg");
  star_Img = loadAnimation("star.png");

  start_Img = loadImage("start.png");

 // bullet_Imag = loadImage("bullet0.png");

  launch_Sound = loadSound("launch.wav");
  win_Sound = loadSound("win.mp3");
  claimSound = loadSound("claim.wav");
  coinSound = loadSound("coin1.wav");
  collided = loadSound("collided.wav");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  coin2 = createSprite(width/1.28,height/9.3,20,20);
  coin2.addImage(coinImage);
  coin2.scale = 0.7;

  start0 = createSprite(width/1.87, height/1.23,20,20);
  start0.addImage(start_Img);
  start0.scale = 0.17;
 
   restart = createSprite(width/2.014,height/2.2,20,20);
   restart.addImage(restartImage);
   restart.scale = 0.5
   restart.visible = false;

   purchase_sprite = createSprite(width/1.25, height/4, 20, 20);
   purchase_sprite.addImage(purchase_Img);
   purchase_sprite.scale = 0.15;
   purchase_sprite.visible = false;

   coin1 = createSprite(width/1.080,height/4,20,20);
   coin1.addImage(coinImage);
   coin1.scale = 0.7;
   coin1.visible = false;

      grass_sprite = createSprite(width/2,height/1.01,windowWidth, 100);
      grass_sprite.shapeColor = "green";
      grass_sprite.visible = true;

      launchpad = createSprite(width/2, height/1.2, 20, 20);
      launchpad.addImage(launchpad_Imag);
      launchpad.scale = 0.5;
      launchpad.visible = true;

   obstacleGroup = new Group();
   coinGroup = new Group();
   cloudGroup = new Group();
   firstaidGroup = new Group(); 

}

function draw() {
  
  background("rgb(52,227,248)");
  
  if(gameState === INTRO){

    background(0);

    strokeWeight(2);
    stroke("0");
    fill("#00cec9");
    textSize(30);
    text("Hello! Welcome to Make it to the Moon Game. You are devoted for a mission to Moon.", width/7,height/4);

    strokeWeight(2);
    stroke("0");
    fill("yellow");
    textSize(30);
    text("Press right and left arrow keys to move horizontally in the game.", width/3.8,height/3.12);
    text("Press up arrow key to move upwards", width/2.8,height/2.64)
    text("You can see your health on the top right corner.", width/3.1,height/2.3);
    text("Be safe from the spines. If they will touch you, your health will decrease based on the power of the spines.",width/22,height/2.04);
    text("If your health decreases, don't worry I have left some first aid for you. They will help you in increasing the health.", width/47, height/1.82);
    text("You will get to see your distance covered increasing on the top left corner when you play the game.", width/12,height/1.66)
    text("Cover 382,500 km to reach on the moon.", width/2.65, height/1.52);
    fill("#00cec9");
    text("Good luck!", width/2.07, height/1.40);

    grass_sprite.visible = false;
    launchpad.visible = false;

    if(mousePressedOver(start0)){

      gameState = AUTOMODE;
      start0.destroy();

      player = createSprite(width/2,height/1.3,20,20);
      player.addAnimation("airplane",playerImage);
      player.scale = 0.7; 

      player.setCollider("rectangle",0,0,200,290);
      //player.debug = true;    

    }

    }

    if(gameState === AUTOMODE && player.velocityY === 0 && gameState !== PLAY){

      /*grass_sprite = createSprite(width/2,height/1.01,windowWidth, 100);
      grass_sprite.shapeColor = "green";
      grass_sprite.visible = true;

      launchpad = createSprite(width/2, height/1.2, 20, 20);
      launchpad.addImage(launchpad_Imag);
      launchpad.scale = 0.5;
      launchpad.visible = true;*/

      player.depth = launchpad.depth;
      player.depth = player.depth+1;

      grass_sprite.visible = true;
      launchpad.visible = true;

      player.velocityY = 0;
    
    if(keyDown(UP_ARROW)){
      player.velocityY = -5;

      launch_Sound.play();
    }

      if(player.velocityY > (-6) && player.velocityY !== 0){
        gameState = PLAY;
        grass_sprite.visible = false;
        launchpad.visible = false;
      }

    }

  if(gameState === PLAY){

    //launchpad.destroy();
    //grass_sprite.destroy();
  
    grass_sprite.visible = false;
    launchpad.visible = false;
    purchase_sprite.visible = true;
    coin1.visible = true;

    player.y = height/1.3;

    currentHeight = currentHeight + Math.round(50);

    //currentHeight = Math.round(currentHeight+frameCount/60);

    strokeWeight(2.5);
    stroke(0);
    fill("#5758BB");
    textSize(30);
    text("Purchase a first aid", width/1.3, height/5.7);
    text("for  100", width/1.19, height/3.73);
  
      if(mousePressedOver(purchase_sprite) && cI>=100){
        purchase();
      } 
      
      if(mousePressedOver(purchase_sprite) && cI<100){
        text("Not enough money", width/1.3, height/2.9);
      }

    if(keyDown("right")){
     player.velocityX = (6 + 3*score/100);
     }
  
  if(keyDown("left")){
     player.velocityX = -(6 + 3*score/100);
  }

  if(currentHeight%500 === 0){
    //player.velocityX += 8;

    if(keyDown("right")){
      player.velocityX = 6;
      }
   
   if(keyDown("left")){
      player.velocityX = -6;
   }
 
  }

  edges = createEdgeSprites();
  
  player.bounceOff(edges);

  spawnobstacles();
  spawncoins();
  spawnclouds();
  spawnfirstaid();
  createSpaceImg();

  textSize(15);
  strokeWeight(5);

    if(coinGroup.isTouching(player)){
      
       coinGroup[0].destroy();
    
       coinSound.play();

      cI += 1;
      
         }
      
    
    if(obstacleGroup.isTouching(player)){      
  
      obstacleGroup[0].destroy();

      collided.play();
      
      score -=5;

    }  

    if(firstaidGroup.isTouching(player)){
       
      
      score+=5;
  
      firstaidGroup[0].destroy();

      claimSound.play();
      
    }  

   /* if(firstaidGroup.isTouching(player)){
       
      
      score+=5;
  
      firstaidGroup[0].destroy();

      claimSound.play();
      
    }  */

    if(obstacleGroup.isTouching(firstaidGroup)){
       
      firstaidGroup[0].destroy();
    }  

    if(currentHeight ===  382500){

      gameState = WIN;

    }

  }

  if(gameState === WIN){

    win();

    strokeWeight(6);
    stroke("#3498db");
    fill("#8e44ad");
    textSize(40);
    text("Hurray! You reached on the moon", width/2-(280),height/3);    

  }

  if(score === 0){

    end();

  }

  strokeWeight(2.5);
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Player health : " + score, width/1.3,height/15);
  
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Current height (in km) : " + currentHeight, width/25,height/15);

  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Cover 382,500 km height to reach on moon", width/25,height/8);

  stroke(0);
  fill("#5758BB");
  textSize(30);
  text(": " + cI, width/1.25,height/8.5);

  drawSprites();
 
  }

function purchase(){

  cI = cI-100;

  score+=10;

}

function createSpaceImg(){

  if(currentHeight >= 15000){
    background("black");

    cloud.addAnimation("abc", star_Img);
    cloud.scale = 0.2;

    text("Purchase a first aid", width/1.3, height/5.7);
    text("for  100", width/1.19, height/3.73);

  }

}spaceImage

function spawnobstacles(){
  
  if(frameCount%27 === 0){
     
    obstacle = createSprite(1000,-5,20,20);
    obstacle.addAnimation("falling",obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.x = Math.round(random(4,width/1.01));
    
    obstacle.velocityY = (8 + 3*score/100);
  
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);

     }
}


function spawncoins(){
  
  if(frameCount%27 === 0){
     
   coin = createSprite(100,-5,20,20);
   coin.addImage(coinImage);
   coin.scale = 1;

   coin.x = Math.round(random(5,width/1.01));
    
   coin.velocityY = (8 + 3*score/100);
    
   coin.lifetime = 400;
  
   coinGroup.add(coin);

     }
}

function spawnclouds(){
  
  if(frameCount%50 === 0){
     
   cloud = createSprite(650,-5,20,20);
   cloud.addAnimation("abc", cloudImage);
   cloud.scale = 1;
    
    cloud.x = Math.round(random(6,width/1.01));
    
    cloud.velocityY = (7 + 3*score/100);

    cloud.lifetime = 400;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
  
   cloudGroup.add(cloud);
    
     }
}


function spawnfirstaid(){
  
  if(frameCount%100 === 0){
     
   firstaid = createSprite(650,-5,20,20);
   firstaid.addImage(firstaidImage);
   firstaid.scale = 0.2;
    
    firstaid.x = Math.round(random(1,width/1.01));
    
    firstaid.velocityY = (7 + 3*score/100);

    firstaid.lifetime = 400;
    
    firstaid.depth = player.depth;
    firstaid.depth = player.depth + 1;
  
    firstaidGroup.add(firstaid);
    
     }
  
  }

function reset(){

  gameState = AUTOMODE;
  player.velocityY = 0;
  gameState !== PLAY;

  restart.visible = false;

  player = createSprite(width/2,height/1.3,20,20);
  player.addAnimation("airplane",playerImage);
  player.scale = 0.7; 

  player.setCollider("rectangle",0,0,320,250);
  //player.debug = true;    

  //obstacleGroup.destroyEach();
  //oinGroup.destroyEach();
  
  score = 50;
  cI = 0;
  currentHeight = 0;

}

function win(){

  restart.visible = false;

  moon = createSprite(width/2,height/2,20);
  moon.addImage(moonImage);

  player.destroy();
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  cloudGroup.destroyEach();
  firstaidGroup.destroyEach();

  background(spaceImage);

}

function end(){

 currentHeight = 0;

  player.velocityX = 0;
  player.velociyY = 0;
  
  player.destroy();
  purchase_sprite.visible = false;
   
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityYEach(0);
    
  coinGroup.setVelocityXEach(0);
  coinGroup.setVelocityYEach(0);
    
  cloudGroup.setVelocityXEach(0);
  cloudGroup.setVelocityYEach(0);

  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  cloudGroup.destroyEach();
  firstaidGroup.destroyEach();

  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }

  
  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Oops! Your Space Shuttle is Destroyed!! Try Again to Make it to the Moon!",width/5,height/2.5);

}