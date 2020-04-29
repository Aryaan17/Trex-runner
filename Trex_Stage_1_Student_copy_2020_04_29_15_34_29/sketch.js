var trex, trex_img1, trex_img2, obstacles, ob1, ob2, ob3, ob4, ob5, ob6, ground, ground_img, gameover, restart, gameover_img, restart_img, cloud, cloud_img, invisibleground, sc, r1, gamestate, Cloudsgroup, Obstaclesgroup;

function preload(){
  trex_img1= loadAnimation("trex1.png", "trex3.png",     "trex4.png"); 
  trex_img2= loadImage("trex_collided.png");
  ground_img= loadImage("ground2.png");
  cloud_img= loadImage("cloud.png");
  ob1= loadImage("obstacle1.png");
  ob2= loadImage("obstacle2.png");
  ob3= loadImage("obstacle3.png");
  ob4= loadImage("obstacle4.png");
  ob5= loadImage("obstacle5.png");
  ob6= loadImage("obstacle6.png");
  gameover_img= loadImage("gameOver.png");
  restart_img= loadImage("restart.png");
}

function setup() {
  createCanvas(800, 400);
  
  trex = createSprite(50, 385, 20, 20);
  trex.addAnimation("trexrun", trex_img1);
  trex.scale = 0.4;
  
  ground = createSprite(200, 380, 400, 0);
  ground.addImage("ground" , ground_img);
  
  invisibleground = createSprite(50, 395, 20, 10); 
  invisibleground.visible = false;
  
  Cloudsgroup = new Group();
  Obstaclesgroup = new Group();
  
  gameover = createSprite(350, 170, 1, 1);
  gameover.depth = Cloudsgroup.depth+10;
  restart = createSprite(350, 220, 1, 1);
  restart.depth = Cloudsgroup.depth+10;
  
  gamestate = 1;
  
  sc = 0;
}

function draw() {
  background("brown");
  
 // console.log(sc);
  
  trex.velocityY = trex.velocityY + 1;
  
  if (gamestate === 1) {
    
    if (ground.x <0){
      ground.x = ground.width/2;
    }
    
    ground.velocityX = -10;

    if (keyDown("space") && trex.y>= 371){
      trex.velocityY = -12;
    }
  
    sc = sc + Math.round(getFrameRate()/50);
    
    if (Obstaclesgroup.isTouching(trex)){
      gamestate = 0;
   }
   spawnClouds();
  
   spawnObstacles();

 }
  
  if (gamestate === 0) {
     gameover.visible = true;
     restart.visible = true;
     ground.velocityX = 0;
     Obstaclesgroup.setVelocityXEach(0);
     trex.addImage("collided trex", trex_img2);
     Cloudsgroup.setVelocityXEach(0);
     gameover.addImage("Game over", gameover_img);
     restart.addImage("restart", restart_img);
     restart.scale = 0.5;
     Cloudsgroup.setLifetimeEach(-1);
     Obstaclesgroup.setLifetimeEach(-10);
     if (mousePressedOver(restart) || keyDown("space")){
       Obstaclesgroup.destroyEach();
       Cloudsgroup.destroyEach();
       sc = 0;
       gameover.visible = false;
       restart.visible = false;
       gamestate = 1;
     }
  }
  

  
  text ("Score: "+ sc, 320, 40);
  
  
  trex.collide(invisibleground);
  drawSprites ();
}

function spawnClouds (){
  if (frameCount%60 === 0){
    cloud = createSprite(820, 200, 20, 20);
    cloud.addImage("cloud", cloud_img);
    cloud.velocityX= -10;
    cloud.lifetime= 83;
    cloud.y= random(50, 360); 
    trex.depth = cloud.depth + 100;
    Cloudsgroup.add(cloud);
  }
}

function spawnObstacles (){
  if (frameCount%50 === 0){
    obstacles = createSprite(820, 200, 20, 20);
    obstacles.y = 371;
    r1 = Math.round(random(1,6));    
    switch(r1){ 
      case 1 : obstacles.addImage("obstacles", ob1);
                break;
      case 2 : obstacles.addImage("obstacle2", ob2);
                break;
      case 3 : obstacles.addImage("obstacle3", ob3);
                break;
      case 4 : obstacles.addImage("obstacle4", ob4);
                break;
      case 5 : obstacles.addImage("obstacle5", ob5);
                break;
      case 6 : obstacles.addImage("obstacle6", ob6);
                break;
      default : break;
    }
    obstacles.scale= 0.5;
    obstacles.velocityX = ground.velocityX;
    obstacles.lifetime = 105;
    Obstaclesgroup.add(obstacles);
  }
} 
