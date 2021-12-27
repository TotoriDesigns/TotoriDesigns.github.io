var cheongan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
var ship_izy = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
let noiseScale=0.02;
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
let b_theta;
let motionVec;
let mousePos;
let cb_theta = 0;
let innt1 = 0
let innt2 = 0
/*let spawn1 = createVector(0,0)
let spawn2 = createVector(0,0)
let spawn3 = createVector(0,0)*/

function preload() {
  fontBold = loadFont('assets/KOZGOPRO-BOLD.OTF');
}

function setup() {
  cnv = createCanvas(800, 800);
  posVec = createVector(0,0);
  anchorVec = createVector(400,400);
  moveVec = createVector(800,800);
  moveVec_2 = createVector(800,800);
  motionVec = createVector(0,0);
  mousePos = createVector(mouseX,mouseY);
  //spawn1 = createVector(random,0)
  
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

function texting(linein,moveV=moveVec,colors = createVector(325, 0, 0))
{
  push();
  textSize(40);
  fill(colors.x,colors.y,colors.z);
  textFont(fontBold);
  text(linein, moveV.x + anchorVec.x, moveV.y + anchorVec.y);
  pop();
}

function atv(angle,scaling = 300)
{
  return createVector(cos(angle)*scaling,sin(angle)*scaling)
}


function atv_pos(angle,scaling = 300)
{
  return [cos(angle)*scaling,sin(angle)*scaling]
}

let ROT = 0
let ROT2 = 0


function draw() {
  ROT += 0.001
  if(ROT >= 2*PI){
    ROT = 0
  }
  
  ROT2 += 0.0005
  if(ROT2 >= 2*PI){
    ROT2 = 0
  }
  
  background(30);
  
  //strokeWeight(10);
  //point(x, y);
  //textSize(32);
  //text(str(degrees(theta)), 10, 30);
  //fill(0, 102, 153);
  
  if(l2z(mouseX) == 0 || l2z(mouseY) == 0)
  {
    if(l2z(mouseX) == 0 && l2z(mouseY)<0)
    {
      b_theta = 3*PI/2
      abstheta = 3*PI/2
    }
    else if(l2z(mouseX) == 0 && l2z(mouseY)>0)
    {
      b_theta = PI/2
      abstheta = PI/2
    }
    else if(l2z(mouseY) == 0 && l2z(mouseX)>0)
    {
      b_theta = 0 
      abstheta = 0
    }
    else if(l2z(mouseY) == 0 && l2z(mouseX)<0)
    {
      b_theta = PI
      abstheta = PI
    }
  }
  else
    { 
      b_theta = atan(l2z(mouseY)/l2z(mouseX)) 
      abstheta = atan(l2z(mouseY)/l2z(mouseX)) 
      
    }
   if(l2z(mouseX) <= 0 && l2z(mouseY) <= 0){b_theta += PI}
  else if(l2z(mouseX) <= 0 && l2z(mouseY) >= 0){b_theta += PI}
  else if(l2z(mouseX) >= 0 && l2z(mouseY) <= 0){b_theta += 2*PI}
 
  
  motionVec = p5.Vector.sub(createVector(mouseX,mouseY),mousePos)
  let distance = round(sqrt(abs((motionVec.x*motionVec.x + motionVec.y*motionVec.y))))
  
  let motion = createVector(mouseX,mouseY).dist(mousePos);
  
  let mX = mouseX - mousePos.x
  let mY = mouseY - mousePos.y
  let mR = b_theta - cb_theta
  let R = 1;
  if(mR != 0){
    if(mR < 0){
      R = -1
    }
  }
    theta = R*motion/1000
    cache_theta += theta
    
  
  
  for(let i = 0 ; i < cheongan.length;i++)
    {
      push();
      //texting(cheongan[i]);
      moveVec = atv(((i+1)*2*PI/cheongan.length) + cache_theta + ROT);
      //moveVec_2 = atv(((i+1)*2*PI/cheongan.length) + cache_theta);
      //line(anchorVec.x,anchorVec.y,moveVec.x,moveVec.y)
      
      /*push();
      stroke('purple'); // Change the color
      strokeWeight(10);
      
      point(moveVec_2.x,moveVec_2.y)
      pop();*/
      if(DoesIntersect(p5.Vector.add(moveVec,anchorVec))){
        texting(cheongan[i],moveVec,createVector(401, 401, 401));
      }
      else{
        texting(cheongan[i]);
      }
      pop();
    }
  for(let j = 0 ; j < ship_izy.length;j++)
    {
      push();
      
      
  
      
      moveVec_2 = atv(((j+1)*2*PI/ship_izy.length) + cache_theta*0.4 + ROT2,200);
      //moveVec_2 = atv(((i+1)*2*PI/ship_izy.length) + cache_theta*0.1,200);
      //line(anchorVec.x,anchorVec.y,moveVec.x,moveVec.y)
      
      /*push();
      stroke('purple'); // Change the color
      strokeWeight(10);
      
      point(moveVec_2.x,moveVec_2.y)
      pop();*/
      if(DoesIntersect(p5.Vector.add(moveVec_2,anchorVec),20)){
        texting(ship_izy[j],moveVec_2,createVector(221, 221, 0));
      }
      else{
        texting(ship_izy[j],moveVec_2,createVector(201, 0, 0));
      }
      pop();
    }
  //cache_theta = cache_theta*0.9
  mousePos = createVector(mouseX,mouseY)
  cb_theta = b_theta

}

function DoesIntersect(circle1,r=80) {
  let center_distance = dist(circle1.x+20, circle1.y-20,
    mouseX,mouseY);
  let radius_sum = r + 3;
  return radius_sum > center_distance;
}
