OperationsOnScreen = []
LinesBetweenOps = []

let drawingLine = false;
let generatedOperator = false;
let scale = 1;
let deltaX = 0;
let deltaY = 0;
let movingOperator = false;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseWheel(changeScale)

  translate(width / 2, height / 2)
  noStroke()

  OperationsOnScreen[0] = new Result(0,0,0)
}

function draw() 
{  
  background(50);
  moveCanvas()

  push()
  translate(width / 2, height / 2)

  for (let i = 0; i < OperationsOnScreen.length; i++)
  {
    if (OperationsOnScreen[i] != undefined)
    {
      OperationsOnScreen[i].Selected()
    }
    
    if (OperationsOnScreen[i] != undefined)
    {
      OperationsOnScreen[i].showOp()

      if (OperationsOnScreen[i].out.mouseOverBall() && mouseIsPressed || OperationsOnScreen[i].drawingLine)
      {
        OperationsOnScreen[i].drawingLine = true;
        stroke(100)
        strokeWeight(3 * scale)
        noFill()
        let d = dist(OperationsOnScreen[i].out.x, 0, (mouseX - width / 2), 0)
        let p1 = {x: OperationsOnScreen[i].out.x, y: OperationsOnScreen[i].out.y}
        let p2 = {x: (mouseX - width / 2), y: (mouseY - height / 2)}
        
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
                OperationsOnScreen[i].out.connected = true;
                OperationsOnScreen[i].out.connectedTo.push([OperationsOnScreen[z].id, o]);
                LinesBetweenOps.push([OperationsOnScreen[i].id, OperationsOnScreen[z].id, o]);

                console.log(LinesBetweenOps)
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

  stroke(100)
  noFill()
  strokeWeight(3 * scale)
  for (let i = 0; i < LinesBetweenOps.length; i++)
  {
    

    let d = dist(OperationsOnScreen[LinesBetweenOps[i][0]].out.x, 0, OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].x, 0)
    let p1 = {x: OperationsOnScreen[LinesBetweenOps[i][0]].out.x, y: OperationsOnScreen[LinesBetweenOps[i][0]].out.y}
    let p2 = {x:OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].x, y: OperationsOnScreen[LinesBetweenOps[i][1]].inp[LinesBetweenOps[i][2]].y}
    
    bezier(p1.x, p1.y, p1.x + d/2, p1.y, p2.x - d/2, p2.y, p2.x, p2.y)

    
  }
  noStroke()
  pop()

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
          OperationsOnScreen[OperationsOnScreen.length] = new Plus((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
          break;
        case "Minus":
          OperationsOnScreen[OperationsOnScreen.length] = new Minus((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
          break;
        case "Multiply":
          OperationsOnScreen[OperationsOnScreen.length] = new Mult((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
          break;
        case "Divide":
          OperationsOnScreen[OperationsOnScreen.length] = new Div((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
          break;
        case "Input":
          OperationsOnScreen[OperationsOnScreen.length] = new Input((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
          break;
        case "Result":
          OperationsOnScreen[OperationsOnScreen.length] = new Result((mouseX - width / 2) - 60, (mouseY - height / 2) - 25, OperationsOnScreen.length)
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

function changeScale(event)
{
  if (event.deltaY < 0)
  {
    scale /= 0.9
  }
  else 
  {
    scale *= 0.9
  }
}

function moveCanvas()
{
  if (!mouseIsPressed)
  {
    movingOperator = false;
  }
  if (mouseIsPressed && !movingOperator)
  {
    deltaX += mouseX - pmouseX
    deltaY += mouseY - pmouseY
  }
}