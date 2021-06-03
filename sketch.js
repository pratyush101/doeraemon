var PLAY=1;
var END=0;
var gameState=PLAY;

var player,playerImage;
var obstacle1,obstacle2,obstacle3;
var bg,bgImage;
var score;
var ground;
var obstaclesGroup;
var FoodGroup;
var gameover,gameoverImage;



function preload(){
  
  playerImage=loadAnimation("player1.png","player2.png");
  
  obstacle1=loadImage("obstacle1.jpg");
  obstacle2=loadImage("obstacle2.jpg");
  obstacle3=loadImage("obstacle3.jpg");
  
  bgImage=loadImage("bg.jpg");
  
  food=loadImage("food.png");
  
  gameoverImage=loadImage("game_over.jpg");
  
  
}

function setup() {
  createCanvas(400,400);
  
  bg=createSprite(0,0,400,400);
  bg.addImage("Background",bgImage);
  bg.velocityX=-3;
  
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-3;
  ground.visible=false;
  
  player=createSprite(80,315,20,20);
  player.addAnimation("Player",playerImage);
  player.scale=1.3;
  
  
  score=0;
  
  gameover = createSprite(200,150);
  gameover.addImage("Game Over!",gameoverImage);
  gameover.scale=0.7;
  
  obstaclesGroup=createGroup();
  FoodGroup=createGroup();
 
}

function draw() {
  background("white");
  
  
  if (gameState===PLAY){
    
    gameover.visible = false;
    
    if(bg.x<0){
       bg.x=bg.width/2; 
    } //restting the background
    
    if (keyDown("space")&&player.y>=100){
      player.velocityY=-12; //jump kraane ki condition
    }
    
    player.velocityY=player.velocityY+0.8; //gravity
    
    
    if(ground.x<0){
       ground.x=ground.width/2; 
    }  //restting the ground taaki infinite effect dikhe
    
    if(FoodGroup.isTouching(player)){
      score=score+2;
      FoodGroup.destroyEach();
    } //doraemon agar dora cake ko touch krle
    
     if(obstaclesGroup.isTouching(player)){ 
     gameState=END;
   } //doraemon agar mouse ko touch krle
    
    
    obstacles();
    Food();
    
  }
  
   else if(gameState===END){
     gameover.visible = true;
     
     score=0;
     
     
     
     obstaclesGroup.destroyEach();
     FoodGroup.destroyEach();
     player.destroy();
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     ground.velocityX=0;
     bg.velocityX=0;
     
     
   }
  
  player.collide(ground);
  
 drawSprites();
  
  stroke("purple");
  strokeWeight(3);
  fill("white");
  textFont("Times New Roman");
  textSize(20);
  text("Score: "+score,300,50);
}


function obstacles(){
 if (frameCount % 200 === 0) {
    var obstacle = createSprite(400,327,10,10);
    obstacle.velocityX=-3;
    
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default:break;
    }
   
   obstacle.scale=0.3;
   obstacle.lifetime = 200;
   
  obstaclesGroup.add(obstacle);
   
  }
}


function Food(){
 if (frameCount % 80 === 0) {
    var cake = createSprite(400,120,10,10);
    cake.y = Math.round(random(105,200));
    cake.addImage(food);
    cake.scale = 0.2;
    cake.velocityX = -3;
    cake.lifetime = 200;
    FoodGroup.add(cake); //group mei sprites add krte hain
    
  }
}

