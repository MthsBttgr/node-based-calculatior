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
    this.selected = false;

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
    if(mouseX < (this.x + this.w) * scale && mouseX > this.x * scale && mouseY < (this.y + this.h) * scale && mouseY > this.y * scale)
    {
      return true;
    }
  }

  Selected()
  {
    // Selects and deselects and highlights
    if (this.mouseOverOp() || this.selected)
    {
      fill(100,200)

      if(mouseIsPressed || this.selected)
      {
        this.selected = true;
        fill(75,200)
      }
      rect((this.x - 10) * scale, (this.y - 10) * scale, (this.w + 20) * scale, (this.h + 20) * scale,5)
    }
    if (mouseIsPressed && !this.mouseOverOp())
    {
      this.selected = false;
    }
    //
    
    if (this.selected && keyIsPressed && keyCode === DELETE)
    {
      if (this.out.connected)
      {
        for (let i = 0; i < this.out.connectedTo.length; i ++)
        {
          OperationsOnScreen[this.out.connectedTo[i][0]].inp[this.out.connectedTo[i][1]].connected = false;
          OperationsOnScreen[this.out.connectedTo[i][0]].inp[this.out.connectedTo[i][1]].connectedTo = [];
          console.log(OperationsOnScreen[this.out.connectedTo[i][0]].inp)
        }
      }

      for (let i = 0; i < this.inp.length; i++)
      {
        if (this.inp[i].connected)
        {
          OperationsOnScreen[this.inp[i].connectedTo].out.connected = false;
          OperationsOnScreen[this.inp[i].connectedTo].out.connectedTo = [];
        }
      }

      for (let i = 0; i < LinesBetweenOps.length; i++)
      {
        if (LinesBetweenOps[i].includes(this.id))
        {
          console.log(true);
          LinesBetweenOps.splice(i,1,undefined)
        }
      }

      LinesBetweenOps = LinesBetweenOps.filter(function(arr){if (arr != undefined){return arr}})
      console.log(LinesBetweenOps)

      OperationsOnScreen.splice(this.id, 1, undefined)
    }
  }

  //draws the operator and makes it move when mouse is pressed
  showOp()
  {
    //moving the operator correctly
    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = (this.x * scale - mouseX) ;
      this.mousediffposY = (this.y * scale - mouseY);
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = (mouseX + this.mousediffposX) / scale;
      this.y = (mouseY + this.mousediffposY) / scale;
    }

    //draws the box with text in it
    fill(this.col)
    rect(this.x * scale,this.y * scale, this.w * scale, this.h * scale, 5)

    fill(0)
    text(this.tekst, (this.x + this.w/2) * scale, (this.y + this.h / 2) * scale)
    //

    //drawing input and output points
    for (let i = 0; i < this.inp.length; i++)
    {
        this.inp[i].showBall(this.x * scale, (this.y + (this.h / 3) * (i+1)) * scale)
    }
    this.out.showBall((this.x + this.w) * scale, (this.y + this.h / 2) * scale)
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

  Selected()
  {
    // Selects and deselects and highlights
    if (this.mouseOverOp() || this.selected)
    {
      fill(100,200)

      if(mouseIsPressed || this.selected)
      {
        this.selected = true;
        fill(75,200)
      }
      rect((this.x - 10) * scale, (this.y - 10) * scale, (this.w + 20) * scale, (this.h + 20) * scale,5)
    }
    if (mouseIsPressed && !this.mouseOverOp())
    {
      this.selected = false;
    }
    //
    
    if (this.selected && keyIsPressed && keyCode === DELETE)
    {
      if (this.out.connected)
      {
        for (let i = 0; i < this.out.connectedTo.length; i ++)
        {
          OperationsOnScreen[this.out.connectedTo[i][0]].inp[this.out.connectedTo[i][1]].connected = false;
          OperationsOnScreen[this.out.connectedTo[i][0]].inp[this.out.connectedTo[i][1]].connectedTo = [];
          console.log(OperationsOnScreen[this.out.connectedTo[i][0]].inp)
        }
      }

      for (let i = 0; i < LinesBetweenOps.length; i++)
      {
        if (LinesBetweenOps[i].includes(this.id))
        {
          console.log(true);
          LinesBetweenOps.splice(i,1,undefined)
        }
      }

      LinesBetweenOps = LinesBetweenOps.filter(function(arr){if (arr != undefined){return arr}})

      OperationsOnScreen.splice(this.id, 1, undefined)
      this.inp.remove()
    }
  }

  showOp()
  {
    this.Selected()
    fill(this.col)
    rect(this.x * scale,this.y * scale,this.w * scale,this.h * scale, 5)

    fill(0)
    text(this.tekst, (this.x + 30) * scale, (this.y + 10) * scale)

    this.inp.position((this.x + 5) * scale, (this.y + 25) * scale)


    //drawing output point
    this.out.showBall((this.x + this.w) * scale, (this. y + this.h / 2) * scale)
    //

    //moving the operator correctly
    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = (this.x * scale - mouseX) ;
      this.mousediffposY = (this.y * scale - mouseY);
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = (mouseX + this.mousediffposX) / scale;
      this.y = (mouseY + this.mousediffposY) / scale;
    }
    //
  }

  compute()
  {
    if(this.inp.value() != "")
    {
      return float(this.inp.value())
    }
  }
}

class Result extends Operator
{
  constructor(x,y,id)
  {
    super(x,y,id)

    this.col = color(255)
    this.tekst = "Result:"

    this.inp = [new BallConnector(this.x, this.y + this.h / 2)]
  }

  Selected()
  {
    // Selects and deselects and highlights
    if (this.mouseOverOp() || this.selected)
    {
      fill(100,200)

      if(mouseIsPressed || this.selected)
      {
        this.selected = true;
        fill(75,200)
      }
      rect((this.x - 10) * scale, (this.y - 10) * scale, (this.w + 20) * scale, (this.h + 20) * scale,5)
    }
    if (mouseIsPressed && !this.mouseOverOp())
    {
      this.selected = false;
    }
    //
    
    if (this.selected && keyIsPressed && keyCode === DELETE)
    {
      for (let i = 0; i < this.inp.length; i++)
      {
        if (this.inp[i].connected)
        {
          OperationsOnScreen[this.inp[i].connectedTo].out.connected = false;
          OperationsOnScreen[this.inp[i].connectedTo].out.connectedTo = [];
        }
      }

      for (let i = 0; i < LinesBetweenOps.length; i++)
      {
        if (LinesBetweenOps[i].includes(this.id))
        {
          console.log(true);
          LinesBetweenOps.splice(i,1,undefined)
        }
      }

      LinesBetweenOps = LinesBetweenOps.filter(function(arr){if (arr != undefined){return arr}})

      OperationsOnScreen.splice(this.id, 1, undefined)
    }
  }

  showOp()
  {
    fill(this.col)
    rect(this.x * scale, this.y * scale, this.w * scale, this.h * scale, 5)

    fill(0)
    text(this.tekst, (this.x + 30) * scale, (this.y + 10) * scale)

    //drawing input point
    this.inp[0].showBall(this.x * scale, (this.y + this.h / 2) * scale)
    //

    push()
    if (this.inp[0].connected)
    {
      textAlign(LEFT, TOP)
      fill(0)
      let result = OperationsOnScreen[this.inp[0].connectedTo].compute()

      text(result, (this.x + 5) * scale, (this.y + 30) * scale)
    }
    pop()

    //moving the operator correctly
    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = (this.x * scale - mouseX) ;
      this.mousediffposY = (this.y * scale - mouseY);
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = (mouseX + this.mousediffposX) / scale;
      this.y = (mouseY + this.mousediffposY) / scale;
    }
    //
  }
}