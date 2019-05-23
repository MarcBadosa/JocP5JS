// creem les variables
var x, y;
var xBad, yBad;
var xGlobus, yGlobus;
var score = 0;
const radius = 70;
var r, g, b;
var rBad, gBad, bBad;
var player;
var enemyFruit;
var start = new Boolean(false);
var cor1;
var cor2;
var vides=3;
var BackgroundHome;
var BackgroundFinal;
var scoreTxt;
var difficultyIncreased;
var end = new Boolean(false);
var dificultat;
var incrementat = new Boolean(false);
var animacioDonut;
var animacioFruita;
var audioIntro;
var audioDonut;
var audioFruita;
var audioGlobus;
var carregarJson;
var credits;
var globus;
var CircleObject;
var CircleObjectBad;
var timer;

function preload() {
  //carreguem les musiques i el fitxer json;
  audioDonut = loadSound("Audio/GreatDonut.wav");
  audioFruita = loadSound("Audio/WrongFruit.wav");
  audioGlobus = loadSound("Audio/BalloonCollision.wav");
  audioIntro = loadSound("Audio/IntroInGame.mp3");
  carregarJson = loadJSON("credits.json");
}

function setup() {
  // sona la musica del joc
  audioIntro.play();
  // creem un element del DOM el qual son els credits del joc
  credits = createElement("h1",carregarJson.textCredits);
  credits.position(400,-10);
  //cream canvas i els primers "personatjes"
  createCanvas(windowWidth=1100 , windowHeight=700);
  timer = 10;
  x = random(radius, (windowWidth-radius));
  y = random(radius, (windowHeight-radius));
  xBad = random(radius, (windowWidth-radius));
  yBad = random(radius, (windowHeight-radius));
  xGlobus = random(windowWidth-100);
  yGlobus = 700;
  r = random(255);
  g = random(255);
  b = random(255);  
  //llegim el fitxerJSon i carraguem l'audio

  //carraguem imatges
  BackgroundHome = loadImage('Imatges/home p5js.png');
  BackgroundFinal = loadImage('Imatges/game Over p5js.png');
  cor1 = loadImage('Imatges/heart.png');
  cor2 = loadImage('Imatges/heart-bw.png');
  scoreTxt = loadImage('Imatges/scoreTxt.png');
  difficultyIncreased = loadImage('Imatges/difficulty.png');
  // Donut
  player = createSprite();
  animacioDonut = player.addAnimation("Imatges/donuts","Imatges/donut1.png","Imatges/donut9.png");
  animacioDonut.frameDelay = 15;
  player.scale=.2;
  //Fruita
  enemyFruit = createSprite();
  animacioFruita = enemyFruit.addAnimation("Imatges/fruits","Imatges/fruit1.png","Imatges/fruit7.png");
  animacioFruita.frameDelay = 25;
  enemyFruit.scale=.2;
  //Globus
  globus=createSprite();
  globus.addAnimation("Imatges/globus1.png","Imatges/globus2.png","Imatges/globus6.png");
  globus.scale=.2;

  //dificultat
  dificultat = 10000;

  //intervals variables
  setInterval(addDificulty,6000)
  setInterval(textIncrement,6000);
  x = random(radius, (windowWidth-radius));
  y = random(radius, (windowHeight-radius));
  r = random(255);
  g = random(255);  
  b = random(255);
  CircleObject = new Circle(x,y,r,g,b);
  xBad = random(radius, (windowWidth-radius));
  yBad = random(radius, (windowHeight-radius));
  rBad = random(255);
  gBad = random(255);  
  bBad = random(255);
  CircleObjectBad = new CircleBad(xBad,yBad,rBad,gBad,bBad);
  setInterval(CircleObjectBad.update(xBad,yBad,rBad,gBad,bBad), 2000);
  setInterval(crearGlobus,12000);


}

function draw() {
  // la posicio del globus va disminuint per anar pujant per la pantalla
  globus.position.y--;

  //detecta collisions entre el globus i els cercles per aixi desruirlos
  if (globus.collide(player)){
    x = random(radius, (windowWidth-radius));
    y = random(radius, (windowHeight-radius));
    r = random(255);
    g = random(255);  
    b = random(255);
    CircleObject.update(x,y,r,g,b);
    audioGlobus.play();
    crearGlobus();
  }
  if (globus.collide(enemyFruit)){
    xBad = random(radius, (windowWidth-radius));
    yBad = random(radius, (windowHeight-radius));
    rBad = random(255);
    gBad = random(255);  
    bBad = random(255);
    CircleObjectBad.update(xBad,yBad,rBad,gBad,bBad);
    audioGlobus.play();
    crearGlobus();
  }
  if (end){
    if (!start){
      background(0);
      if (vides == 3){
        cor1.resize(70, 70);

        image(cor1, 1000, 0);
        image(cor1, 950, 0);
        image(cor1, 900, 0);
      }
      if (vides == 2){
        image(cor2, 1000, 0);
        cor2.resize(70, 70);
        image(cor1, 950, 0);
        image(cor1, 900, 0);
        cor1.resize(70, 70);
      }
      if (vides == 1){
        image(cor2, 1000, 0);
        image(cor2, 950, 0);
        image(cor1, 900, 0);
        cor1.resize(70, 70);
        cor2.resize(70, 70);
      }if (vides == 0){
        end = false;
      }
      
      // cercle

      noStroke();
      player.position.x=x;
      player.position.y=y;
      enemyFruit.position.x=xBad;
      enemyFruit.position.y=yBad;
      fill(r, g, b);
      ellipse(x, y, radius*2, radius*2);
      fill(rBad, gBad, bBad);
      ellipse(xBad, yBad, radius*2, radius*2);
      fill(234,134,230);// color score
      textSize(30);
      image(scoreTxt,-55,-160);
      scoreTxt.resize(350,350);
      textSize(40);
      text(score, 140, 60);
      drawSprites();
      textSize(50);
      fill(234,134,230);
      text("Time left for clicking: " + timer, 40, 650);
      if (!incrementat){
        image(difficultyIncreased, 300, -200);
        difficultyIncreased.resize(500,500);
      }
    }else{
        background (0);
        image(BackgroundHome,0,0);
    }
  }else {
    background(50,50,50);
    image(BackgroundFinal,0,0);
    textSize(100);
    fill(234,134,230);
    text(score, 550, 330);
  }
}

// Quan l'usuari clica
function mousePressed() {
  // si clica dins
  var d = dist(mouseX, mouseY, x, y);
  if (d < radius) {
    updateTimer();
    audioDonut.play();
    x = random(radius, (windowWidth-radius));
    y = random(radius, (windowHeight-radius));
    r = random(255);
    g = random(255);  
    b = random(255);
    CircleObject.update(x,y,r,g,b);
    CircleObject.updateDifficulty(false);
    score++;
    
  }
  var dBad = dist(mouseX, mouseY, xBad, yBad);
  if (dBad < radius) {
    xBad = random(radius, (windowWidth-radius));
    yBad = random(radius, (windowHeight-radius));
    rBad = random(255);
    gBad = random(255);  
    bBad = random(255);
    CircleObjectBad.update(xBad,yBad,rBad,gBad,bBad);
    audioFruita.play();
    if (vides > 1 ){
      vides--;
    }
    else{
      end = false;
    }
  }
}
// creem les classes circle i circle bad
class Circle {
    constructor(x,y,r,g,b){
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;  
      this.b = b;
    }
    update(x,y,r,g,b){
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;  
      this.b = b;
    }
    updateDifficulty(crearCercle){
      if (crearCercle){
        x = random(radius, (windowWidth-radius));
        y = random(radius, (windowHeight-radius));
        r = random(255);
        g = random(255);  
        b = random(255);
        setTimeout(CircleObject.update(x,y,r,g,b),dificultat);
      }
    }


}

class CircleBad {
  constructor(xBad,yBad,rBad,gBad,bBad){
    this.xBad = xBad;
    this.yBad = yBad;
    this.rBad = rBad;
    this.gBad = gBad;  
    this.bBad = bBad;
  }
  update(x,y,r,g,b){
    this.xBad = x;
    this.yBad = y;
    this.rBad = r;
    this.gBad = g;  
    this.bBad = b;
  }
}

function crearGlobus(){
  xGlobus = random(windowWidth-100);
  yGlobus = 700;
  globus.position.x=xGlobus;
  globus.position.y=yGlobus;
}


function keyPressed() {
  if (event.keyCode == 13) {
    updateTimer();
    start=false;
  }
  if (keyCode == 32 && !end){
    lose(); 
  }
}

function lose (){
  start = false;
  end = true;
  vides = 3;
  score = 0;
}

function textIncrement(){
  incrementat = !incrementat;
  
  
}
function addDificulty (){
  if (dificultat > 3000){
    dificultat -= 250;
    CircleObject.updateDifficulty(true);
  } 
}

function decreaseTimer(){
  if (!start){
    timer--;
  }
  if (timer == 0 ){
    vides--;
    timer = 10;
  }
}

function updateTimer () {
    timer = 10;
}
setInterval(decreaseTimer,1000);