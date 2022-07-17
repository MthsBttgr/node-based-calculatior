function setup() {
  createCanvas(400, 400);
  noStroke()

  test = new Operator(50,50)
  test1 = new Minus(200,200)
}

function draw() {
  background(220);

  test.showOp()
  test1.showOp()
}

class Operator
{
  constructor(x,y)
  {
    //dimensions and position
    this.x = x;
    this.y = y;
    this.w = 120;
    this.h = 50;

    //stuff for moving the operator
    this.mousediffposX;
    this.mousediffposY;
    this.isMoving = false;

    this.col = color(255,60,150);

    textAlign(CENTER,CENTER)
    textSize(20)
    textFont(BOLD)
    this.tekst = "Plus"
  }

  //returns true if mouse is over the operator
  mouseOverOp()
  {
    if(mouseX < this.x + this.w && mouseX > this.x && mouseY < this.y + this.h && mouseY > this.y)
    {
      return true;
    }
  }

  //draws the operator and makes it move when mouse is pressed
  showOp()
  {
    fill(this.col)
    rect(this.x,this.y,this.w,this.h)

    fill(0)
    text(this.tekst, this.x + this.w/2, this.y + this.h / 2)

    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = this.x - mouseX;
      this.mousediffposY = this.y - mouseY;
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = mouseX + this.mousediffposX;
      this.y = mouseY + this.mousediffposY;
    }
  }
}

class Minus extends Operator
{
  constructor(x,y)
  {
    super(x,y)

    this.col = color(30,255,60)
    this.tekst = "Minus"
  }
}