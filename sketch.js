var theta;
var abstheta;
var anchor = 500;

function setup() {
  createCanvas(1000, 1000);
}

function l2z(posname){
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
function draw() {
  background(220);
  //theta process
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
  //360degrees
  if(l2z(mouseX) <= 0 && l2z(mouseY) <= 0){theta = theta + PI}
  else if(l2z(mouseX) <= 0 && l2z(mouseY) >= 0){theta = theta + PI}
  else if(l2z(mouseX) >= 0 && l2z(mouseY) <= 0){theta += 2*PI}
  line(anchor,anchor,mouseX,mouseY)
  line(anchor,anchor,mouseX,anchor)
  line(mouseX,anchor,mouseX,mouseY)
  
  if(l2z(mouseX) <= 0 && l2z(mouseY) <= 0){arc(anchor,anchor,l2z(mouseX),l2z(mouseY),PI, theta)}
  else if(l2z(mouseX) <= 0 && l2z(mouseY) >= 0){arc(anchor,anchor,l2z(mouseX),l2z(mouseY),theta,PI)}
  else if(l2z(mouseX) >= 0 && l2z(mouseY) <= 0){arc(anchor,anchor,l2z(mouseX),l2z(mouseY),theta,2*PI)}
  else if(l2z(mouseX) >= 0 && l2z(mouseY) >= 0){arc(anchor,anchor,l2z(mouseX),l2z(mouseY),0, theta)}
  //print()
  textSize(32);
  text(str(degrees(theta)), 10, 30);
  fill(0, 102, 153);
}