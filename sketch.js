var PLAY=1;
var END=0;
var gameState=1;

var position;

var fruit1;
var fruit2;
var fruit3;
var fruit4;


var sword;
var swordimage;

var monsterimage;

var score=0

var gameover

function preload(){
  swordimage=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  monsterimage=loadAnimation("alien1.png")
  gameover=loadImage("gameover.png")
  knifeSound=loadSound("knifeSwooshSound.mp3")
  dieSound=loadSound("gameover.mp3")
}

function setup(){
  createCanvas(400,400)
  //creating sword
  
  sword=createSprite(40,200,20,20)
  sword.addImage(swordimage)
  sword.scale=0.5
  fruitGroup= new Group();
  enemyGroup= new Group();
  
  
}

function draw(){
  background("skyblue")
  
   if(gameState===PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  }
  if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.addImage(gameover)
    sword.x=200
    sword.y=200
  

  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSound.play()
    score=score+1
  }
  if(enemyGroup.isTouching(sword)){
    dieSound.play();
    gameState=END
    
  }
  
  fruits();
  enemy();
  drawSprites();
  
 textSize(15)
  text("Score:"+score,320,50)
}

function fruits(){
  if(frameCount%80===0){
    
    fruit=createSprite(400,200,10,10)
    fruit.scale=0.2
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1)
    }else if(r==2){
      fruit.addImage(fruit2)
    }else if(r==3){
      fruit.addImage(fruit3)   
    }else if(r==4){
      fruit.addImage(fruit4)
    }
  
        fruit.setLifetime=100;
    fruit.velocityX=-(7+(score/4));
    fruitGroup.add(fruit)
    fruit.y=Math.round(random(100,300));
    position=Math.round(random(1,4));
    if(position==1){
    fruit.x=400;
    fruit.velocityX=-(7+score/2);
  }
  if(position==2){
    fruit.x=0;
    fruit.velocityX=(7+score/2);
  }
  
  }
  
  
}
function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,10,10)
    monster.addAnimation("moving",monsterimage)
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+score/10)
    monster.setLifetime=50;
    
    
    enemyGroup.add(monster)
  }
}













