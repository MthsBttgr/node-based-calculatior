class Operator
{
  constructor(x,y,id)
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

    this.id = id;

    this.inp = [new BallConnector(this.x, this.y + this.h / 3), new BallConnector(this.x,this.y + (this.h / 3) * 2)]
    this.out = new BallConnector(this.x + this.w, this.y + this.h/2)

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

    //drawing input and output points
    for (let i = 0; i < this.inp.length; i++)
    {
        this.inp[i].showBall(this.x, this.y + (this.h / 3) * (i+1))
    }
    this.out.showBall(this.x+this.w, this.y+this.h/2)
    //

    //moving the operator correctly
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
    //
  }
}
class Plus extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(255,100,100)
    this.tekst = "Plus"
  }

  compute()
  {
    if (this.inp[0].connected && this.inp[1].connected)
    {
        return OperationsOnScreen[this.inp[0].connectedTo].compute() + OperationsOnScreen[this.inp[1].connectedTo].compute()
    }
  }
}
class Minus extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(30,255,60)
    this.tekst = "Minus"
  }

  compute()
  {
    if (this.inp[0].connected && this.inp[1].connected)
    {
        return OperationsOnScreen[this.inp[0].connectedTo].compute() - OperationsOnScreen[this.inp[1].connectedTo].compute()
    }
  }
}
class Mult extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(255,255,60)
    this.tekst = "Multiply"
  }

  compute()
  {
    if (this.inp[0].connected && this.inp[1].connected)
    {
        return OperationsOnScreen[this.inp[0].connectedTo].compute() * OperationsOnScreen[this.inp[1].connectedTo].compute()
    }
  }
}
class Div extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(30,255,255)
    this.tekst = "Divide"
  }

  compute()
  {
    if (this.inp[0].connected && this.inp[1].connected)
    {
        return OperationsOnScreen[this.inp[0].connectedTo].compute() / OperationsOnScreen[this.inp[1].connectedTo].compute()
    }
  }
}

class Input extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(255,70,255)
    this.tekst = "Input:"

    this.inp = createInput('')
    this.inp.position(x + 5, y + 25)
    this.inp.size(90, 15)
  }

  showOp()
  {
    fill(this.col)
    rect(this.x,this.y,this.w,this.h)

    fill(0)
    text(this.tekst, this.x + 30, this.y + 10)

    this.inp.position(this.x + 5, this.y + 25)


    //drawing output point
    this.out.showBall(this.x + this.w, this. y + this.h / 2)
    //

    //moving the operator correctly
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
    //
  }

  compute()
  {
    return float(this.inp.value())
  }
}