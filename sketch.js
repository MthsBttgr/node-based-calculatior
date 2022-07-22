OperationsOnScreen = []
LinesBetweenOps = []

let drawingLine = false;
let generatedOperator = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()

  OperationsOnScreen[0] = new Result(500,250,0)
}

function draw() 
{
  background(50);
  frameRate(60)

  for (let i = 0; i < OperationsOnScreen.length; i++)
  {
    if (OperationsOnScreen[i] == undefined)
    {
      break;
    }
    if(OperationsOnScreen[i] != undefined)
    {
      OperationsOnScreen[i].showOp()
      if (OperationsOnScreen[i].out.mouseOverBall() && mouseIsPressed || OperationsOnScreen[i].drawingLine)
      {
        OperationsOnScreen[i].drawingLine = true;
        stroke(100)
        strokeWeight(3)
        noFill()
        let d = dist(OperationsOnScreen[i].out.x, 0, mouseX, 0)
        let p1 = {x: OperationsOnScreen[i].out.x, y: OperationsOnScreen[i].out.y}
        let p2 = {x: mouseX, y: mouseY}


        for (let z = 0; z < OperationsOnScreen.length; z++)
        {
          if (OperationsOnScreen[z] != undefined)
          {
            for (let o = 0; o < OperationsOnScreen[z].inp.length; o++)
            {
              if(OperationsOnScreen[z].inp[o].mouseOverBall() && !OperationsOnScreen[z].inp[o].connected)
              {
                p2 = {x: OperationsOnScreen[z].inp[o].x, y: OperationsOnScreen[z].inp[o].y}
              }
              if (mouseIsPressed && OperationsOnScreen[z].inp[o].mouseOverBall() && !OperationsOnScreen[z].inp[o].connected)
              {
                if (z === i)
                {
                  break;
                }
              
                OperationsOnScreen[i].drawingLine = false;
                OperationsOnScreen[z].inp[o].connected = true;
                OperationsOnScreen[z].inp[o].connectedTo = OperationsOnScreen[i].id
                //OperationsOnScreen[i].out.connectedTo = OperationsOnScreen[z].id;
                LinesBetweenOps.push([OperationsOnScreen[i].id, OperationsOnScreen[z].id, o]);
              }
              if (mouseIsPressed && !(OperationsOnScreen[z].inp[o].mouseOverBall() || OperationsOnScreen[i].out.mouseOverBall()))
              {
                OperationsOnScreen[i].drawingLine = false;
              }
            }
          }
        }
        bezier(p1.x, p1.y, p1.x + d/2, p1.y, p2.x - d/2, p2.y, p2.x, p2.y)
        noStroke()
      }
    }
  }

  for (let i = 0; i < LinesBetweenOps.length; i++)
  {
    stroke(100)
    noFill()
    let d = dist(OperationsOnScreen[LinesBetweenOps[i][0]].out.x, 0, OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].x, 0)
    let p1 = {x: OperationsOnScreen[LinesBetweenOps[i][0]].out.x, y: OperationsOnScreen[LinesBetweenOps[i][0]].out.y}
    let p2 = {x:OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].x, y: OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].y}
    
    bezier(p1.x, p1.y, p1.x + d/2, p1.y, p2.x - d/2, p2.y, p2.x, p2.y)
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
          OperationsOnScreen[OperationsOnScreen.length] = new Plus(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
          break;
        case "Minus":
          OperationsOnScreen[OperationsOnScreen.length] = new Minus(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
          break;
        case "Multiply":
          OperationsOnScreen[OperationsOnScreen.length] = new Mult(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
          break;
        case "Divide":
          OperationsOnScreen[OperationsOnScreen.length] = new Div(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
          break;
        case "Input":
          OperationsOnScreen[OperationsOnScreen.length] = new Input(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
          break;
        case "Result":
          OperationsOnScreen[OperationsOnScreen.length] = new Result(mouseX - 60, mouseY - 25, OperationsOnScreen.length)
      }

      console.log(OperationsOnScreen)
    }
  }
  
  rect(x,y,w,h, 5)
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