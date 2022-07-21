OperationsOnScreen = []
LinesBetweenOps = []

let drawingLine = false;
let generatedOperator = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()

  OperationsOnScreen[0] = new Result(500,250,5)
}

function draw() 
{
  background(50);

  for (let i = 0; i < OperationsOnScreen.length; i++)
  {
    OperationsOnScreen[i].showOp()
    
    if (OperationsOnScreen[i].out.mouseOverBall() && mouseIsPressed || OperationsOnScreen[i].drawingLine)
    {
      OperationsOnScreen[i].drawingLine = true;
      stroke(100)
      strokeWeight(3)
      line(OperationsOnScreen[i].out.x, OperationsOnScreen[i].out.y, mouseX, mouseY)
      noStroke()

      for (let z = 0; z < OperationsOnScreen.length; z++)
      {
        for (let o = 0; o < OperationsOnScreen[z].inp.length; o++)
        {
          if (mouseIsPressed && OperationsOnScreen[z].inp[o].mouseOverBall() && !OperationsOnScreen[z].inp[o].connected)
          {
            if (z === i)
            {
              break;
            }

            OperationsOnScreen[i].drawingLine = false;
            OperationsOnScreen[z].inp[o].connected = true;
            OperationsOnScreen[z].inp[o].connectedTo = OperationsOnScreen[i].id
            LinesBetweenOps.push([OperationsOnScreen[i].id, OperationsOnScreen[z].id, o]);
          }
          if (mouseIsPressed && !(OperationsOnScreen[z].inp[o].mouseOverBall() || OperationsOnScreen[i].out.mouseOverBall()))
          {
            OperationsOnScreen[i].drawingLine = false;
          }
        }
      }
    }
  }

  for (let i = 0; i < LinesBetweenOps.length; i++)
  {
    stroke(100)
    line(OperationsOnScreen[LinesBetweenOps[i][0]].out.x, OperationsOnScreen[LinesBetweenOps[i][0]].out.y, 
      OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].x, OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].y)
    noStroke()
  }

  fill(100)
  rect(0,height - 100, width, 100)

  GenerateOperator(20, height - 75, 100, 50, color(255,100,100), 'Plus')
  GenerateOperator(140, height - 75, 100, 50, color(30,255,60), 'Minus')
  GenerateOperator(260, height - 75, 100, 50, color(255,255,60), 'Multiply')
  GenerateOperator(380, height - 75, 100, 50, color(30,255,255), 'Divide')
  GenerateOperator(500, height - 75, 100, 50, color(255,70,255), 'Input')
  GenerateOperator(620, height - 75, 100, 50, color(255), 'Result')

  if (!mouseIsPressed)
  {
    generatedOperator = false;
  }
}

function GenerateOperator(x,y,w,h,col,type)
{
  let originX = width / 2 + random(-50, 50)
  let originY = height / 2 + random(-50,50)
  fill(col)

  if (mouseOverRect(x,y,w,h))
  {
    fill(col.levels[0] * 0.8, col.levels[1] * 0.8, col.levels[2] * 0.8)

    if(mouseIsPressed && !generatedOperator)
    {
      generatedOperator = true;
      switch (type)
      {
        case "Plus":
          OperationsOnScreen[OperationsOnScreen.length] = new Plus(originX, originY, OperationsOnScreen.length)
          break;
        case "Minus":
          OperationsOnScreen[OperationsOnScreen.length] = new Minus(originX, originY, OperationsOnScreen.length)
          break;
        case "Multiply":
          OperationsOnScreen[OperationsOnScreen.length] = new Mult(originX, originY, OperationsOnScreen.length)
          break;
        case "Divide":
          OperationsOnScreen[OperationsOnScreen.length] = new Div(originX, originY, OperationsOnScreen.length)
          break;
        case "Input":
          OperationsOnScreen[OperationsOnScreen.length] = new Input(originX, originY, OperationsOnScreen.length)
          break;
        case "Result":
          OperationsOnScreen[OperationsOnScreen.length] = new Result(originX, originY, OperationsOnScreen.length)
      }
    }
  }
  
  rect(x,y,w,h)
  push()
  fill(0)
  text(type, x + w/2, y + h/2)
}

function mouseOverRect(x,y,w,h)
{
  if (mouseX > x && mouseX < (x + w) && mouseY > y && mouseY < (y + h))
  {
    return true;
  }
}