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
    if((mouseX - width / 2) < (this.x + this.w) * scale + deltaX && (mouseX - width / 2) > this.x * scale + deltaX && (mouseY - height/ 2) < (this.y + this.h) * scale + deltaY && (mouseY - height/ 2) > this.y * scale + deltaY)
    {
      movingOperator = true;
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
      rect((this.x - 10) * scale + deltaX, (this.y - 10) * scale + deltaY, (this.w + 20) * scale, (this.h + 20) * scale,5)
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
      this.mousediffposX = (this.x * scale - (mouseX - width / 2)) ;
      this.mousediffposY = (this.y * scale - (mouseY - height/ 2));
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = ((mouseX - width / 2) + this.mousediffposX) / scale;
      this.y = ((mouseY - height/ 2) + this.mousediffposY) / scale;
    }

    //draws the box with text in it
    fill(this.col)
    rect(this.x * scale + deltaX, this.y * scale + deltaY, this.w * scale, this.h * scale, 5 * scale)

    fill(0)
    textSize(20 * scale)
    text(this.tekst, (this.x + this.w/2) * scale + deltaX, (this.y + this.h / 2) * scale + deltaY)
    //

    //drawing input and output points
    for (let i = 0; i < this.inp.length; i++)
    {
        this.inp[i].showBall(this.x * scale + deltaX, (this.y + (this.h / 3) * (i+1)) * scale + deltaY)
    }
    this.out.showBall((this.x + this.w) * scale + deltaX, (this.y + this.h / 2) * scale + deltaY)
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
    this.inp.position(x + 5 + width / 2, y + 25 + height / 2)
    this.inp.size(90 * scale, 15 * scale)
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
      rect((this.x - 10) * scale + deltaX, (this.y - 10) * scale + deltaY, (this.w + 20) * scale, (this.h + 20) * scale,5)
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
    rect(this.x * scale + deltaX, this.y * scale + deltaY, this.w * scale, this.h * scale, 5 * scale)

    fill(0)
    textSize(20 * scale)
    text(this.tekst, (this.x + 30) * scale + deltaX, (this.y + 10) * scale + deltaY)

    this.inp.position((this.x + 5 ) * scale + width / 2 + deltaX, (this.y + 25 ) * scale + height / 2 + deltaY)
    this.inp.size(90 * scale, 15 * scale)
    this.inp.style('font-size', 15 * scale + 'px')
    this.inp.style('padding', 2 * scale + 'px')
    this.inp.style('border', '0px')


    //drawing output point
    this.out.showBall((this.x + this.w) * scale + deltaX, (this. y + this.h / 2) * scale + deltaY)
    //

    //moving the operator correctly
    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = (this.x * scale - (mouseX - width / 2)) ;
      this.mousediffposY = (this.y * scale - (mouseY - height/ 2));
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = ((mouseX - width / 2) + this.mousediffposX) / scale;
      this.y = ((mouseY - height/ 2) + this.mousediffposY) / scale;
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
      rect((this.x - 10) * scale + deltaX, (this.y - 10) * scale + deltaY, (this.w + 20) * scale, (this.h + 20) * scale,5)
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
    rect(this.x * scale + deltaX, this.y * scale + deltaY, this.w * scale, this.h * scale, 5 * scale)

    fill(0)
    textSize(20 * scale)
    text(this.tekst, (this.x + 30) * scale + deltaX, (this.y + 10) * scale + deltaY)

    //drawing input point
    this.inp[0].showBall(this.x * scale + deltaX, (this.y + this.h / 2) * scale + deltaY)
    //

    push()
    if (this.inp[0].connected)
    {
      textAlign(LEFT, TOP)
      fill(0)
      let result = OperationsOnScreen[this.inp[0].connectedTo].compute()

      text(result, (this.x + 5) * scale + deltaX, (this.y + 30) * scale + deltaY)
    }
    pop()

    //moving the operator correctly
    if (this.mouseOverOp() && !this.isMoving)
    {
      this.mousediffposX = (this.x * scale - (mouseX - width / 2)) ;
      this.mousediffposY = (this.y * scale - (mouseY - height/ 2));
    }
    
    if(!mouseIsPressed)
    {
      this.isMoving = false;
    }

    if((mouseIsPressed && this.mouseOverOp()) || this.isMoving)
    {
      this.isMoving = true;
      this.x = ((mouseX - width / 2) + this.mousediffposX) / scale;
      this.y = ((mouseY - height/ 2) + this.mousediffposY) / scale;
    }
    //
  }
}