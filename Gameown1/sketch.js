var score = 0;
var PLAY = 1;
var END = 0;
var HOME = 2;
var gameState = HOME;
var player,playerimg;
var bg,backgroundimg;
var enshipsGroup,enshipimg;
var enshipsGroup2,enshipimg2;
var bulletGroup,bulletimg;
var gameover,gameoverimg;
var restart, restartimg;
var laserbulletmp3,destroyenshipmp3,playerdestroyedmp3;

function preload(){
backgroundimg = loadImage('galaxy.jpg');
playerimg = loadImage('pixilart-drawing.png');
enshipimg = loadImage('pixilart-drawing (2).png');
bulletimg = loadImage('Imported piskel.gif');
gameoverimg = loadImage('pixilart-drawing (9).png');
//restartimg = loadImage('pixilart-drawing (4).png');
}

function setup() {
createCanvas(1152,658);
bg = createSprite(575,328);
bg.addImage(backgroundimg);
bg.scale = 3;
bg.y = bg.height/2;
player = createSprite(575,600,100,100);
player.scale = 5;
player.addImage(playerimg);
inground = createSprite(576,650,1152,10);
inground.visible = false;
gameover = createSprite(635,635,10,10);
gameover.addImage(gameoverimg) 
gameover.scale = 26;
gameover.visible = false;
//restart = createSprite(586,610,10,10);
//restart.addImage(restartimg);
//restart.scale = 3;
//restart.visible = false;
//heart1 = createSprite(1140,60,10,10);
//heart1.addImage(heartimg);
//heart1.scale = 3;
//heart2 = createSprite(1110,60,10,10);
//heart2.addImage(heartimg);
//heart2.scale = 3;
//heart3 = createSprite(1080,60,10,10);
//heart3.addImage(heartimg)
//heart3.scale = 3;
//visibility = 255;
enshipsGroup = createGroup();
bulletGroup = createGroup();
laserbulletmp3 = loadSound('pm_sfg_vol1_weapon_47_3_gun_gunshot_futuristic_365.mp3');
destroyenshipmp3 = loadSound('sound_spark_Glitch_Factory_01_Decimated_10.mp3');
playerdestroyedmp3 = loadSound('zapsplat_science_fiction_ufo_spacecraft_fly_by_on_fire_explode_001_44093.mp3');
player.setCollider("rectangle",0,0,20,20,50);
}



function draw() {
background(0);
drawSprites();
if(gameState === HOME){
  if(mousePressedOver(player)){
    gameState = PLAY;
  }
}
if(gameState === PLAY){
if(keyDown("space")){
 createbullets(player.x);
 laserbulletmp3.play();
}
player.debug = false
enshipsGroup.debug = false
bg.velocityY = 5
player.position.x = mouseX;
if (bg.y > 500) {
  bg.y = bg.height/2;
}
if(bulletGroup.isTouching(enshipsGroup)){
  enshipsGroup.destroyEach();
  bulletGroup.destroyEach();
  destroyenshipmp3.play();
  score = score + 5
}
if(enshipsGroup.isTouching(inground)){
  score = score - 5
  enshipsGroup.destroyEach();
}
if(enshipsGroup.isTouching(player)){
  tint(255,100)
  gameState = END;  
}
if(gameState === END){
player.destroy();
bg.velocityY = 0
enshipsGroup.setLifetimeEach(-1)
enshipsGroup.destroyEach();
bulletGroup.destroyEach();
bg.destroy();
gameover.visible = true;
}
drawSprites();
text("SCORE: "+ score, 20, 20);
spawnEnships();
}
}
function spawnEnships(){
if(World.frameCount % 30 === 0){
  random1 = random(50,1100);
  enship = createSprite(random1,0,45,45);
  enship.addImage(enshipimg);
  enship.scale = 3
  enship.velocity.y = 8
  enship.lifetime = -192
  enship.debug = false;
  enship.setCollider("rectangle",0,-8,17,17)
  enshipsGroup.add(enship)
  }
}
function createbullets(x){
  bullet = createSprite(600,600,10,10);
  bullet.velocityY = -4
  bullet.y = 460
  bullet.x = x
  bullet.addImage(bulletimg);
  bullet.lifetime = -192
  bullet.debug = false
  bullet.setCollider("rectangle",0,0,7,20)
  bulletGroup.add(bullet)
}

