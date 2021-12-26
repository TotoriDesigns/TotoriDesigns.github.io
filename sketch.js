var cheongan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
var ship_izy = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

let fontBold;
let posVec;
var moveVec;
var moveVec_2;
let anchorVec;
var mul = 300
var theta = 0;
var abstheta;
var anchor = 400;
var cache_theta = 0;
var memory_theta = 0;
var waiting = 0;
var clicked = false;
function preload() {
  fontBold = loadFont('assets/KOZGOPRO-BOLD.OTF');
}

function setup() {
  cnv = createCanvas(800, 800);
  posVec = createVector(0,0);
  anchorVec = createVector(400,400);
  moveVec = createVector(800,800);
  moveVec_2 = createVector(800,800);
}

function l2z(posname)
{
  return (posname - anchor)
}

function lenvec(vec)
{
  if(vec==0)
    {
      return 0
    }
  else
    {
      return anchor*vec/vec
    }
}

function texting(linein)
{
  push();
  textSize(40);
  fill(201, 0, 0);
  textFont(fontBold);
  text(linein, moveVec.x + anchorVec.x, moveVec.y + anchorVec.y);
  pop();
}

function atv(angle,scaling = 300)
{
  return createVector(cos(angle)*scaling,sin(angle)*scaling)
}

function move() {
 if(clicked){
 waiting = 2;
 if(l2z(mouseX) == 0 || l2z(mouseY) == 0)
  {
    if(l2z(mouseX) == 0 && l2z(mouseY)<0)
    {
      theta = 3*PI/2
      abstheta = 3*PI/2
    }
    else if(l2z(mouseX) == 0 && l2z(mouseY)>0)
    {
      theta = PI/2
      abstheta = PI/2
    }
    else if(l2z(mouseY) == 0 && l2z(mouseX)>0)
    {
      theta = 0 
      abstheta = 0
    }
    else if(l2z(mouseY) == 0 && l2z(mouseX)<0)
    {
      theta = PI
      abstheta = PI
    }
  }
  else
    { 
      theta = atan(l2z(mouseY)/l2z(mouseX)) 
      abstheta = atan(l2z(mouseY)/l2z(mouseX)) 
      
    }
   if(l2z(mouseX) <= 0 && l2z(mouseY) <= 0){theta = theta + PI}
  else if(l2z(mouseX) <= 0 && l2z(mouseY) >= 0){theta = theta + PI}
  else if(l2z(mouseX) >= 0 && l2z(mouseY) <= 0){theta += 2*PI}
 }
}

function mousePressed() {
  clicked = true;
  cnv.mouseMoved(move);
}

function mouseReleased() {
  clicked = false;
}

function draw() {
  
  background(40);
  //textSize(32);
  //text(str(degrees(theta)), 10, 30);
  //fill(0, 102, 153);

  if(waiting == 1)
    {
      memory_theta = theta
      waiting = 0;
    }
  else if(waiting == 2){
    let rotationscale = theta - memory_theta;
    cache_theta = theta
    waiting = 1
  }
  else{
    
  }
  for(let i = 0 ; i < cheongan.length;i++)
    {
      texting(cheongan[i]);
      moveVec = atv(((i+1)*2*PI/cheongan.length) + cache_theta*0.6);
      moveVec_2 = atv(((i+1)*2*PI/cheongan.length) + cache_theta);
      //line(anchorVec.x,anchorVec.y,moveVec.x,moveVec.y)
      
      /*push();
      stroke('purple'); // Change the color
      strokeWeight(10);
      
      point(moveVec_2.x,moveVec_2.y)
      pop();*/
    }
  for(let i = 0 ; i < ship_izy.length;i++)
    {
      texting(ship_izy[i]);
      moveVec = atv(((i+1)*2*PI/ship_izy.length) + cache_theta,200);
      //moveVec_2 = atv(((i+1)*2*PI/ship_izy.length) + cache_theta*0.1,200);
      //line(anchorVec.x,anchorVec.y,moveVec.x,moveVec.y)
      
      /*push();
      stroke('purple'); // Change the color
      strokeWeight(10);
      
      point(moveVec_2.x,moveVec_2.y)
      pop();*/
    }
  cache_theta = cache_theta*0.9
  
  

}