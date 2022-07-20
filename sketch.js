OperationsOnScreen = []
Dependencies = []

LinesBetweenOps = []

let drawingLine = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()

  OperationsOnScreen[0] = new Plus(50,50,0)
  OperationsOnScreen[1] = new Minus(250,50,1)
  OperationsOnScreen[2] = new Mult(50,250,2)
  OperationsOnScreen[3] = new Div(250,250,3)
  OperationsOnScreen[4] = new Input(500,50,4)
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

            console.log(OperationsOnScreen[z].inp[o].connectedTo, OperationsOnScreen[z].id)
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

  console.log(OperationsOnScreen[0].compute())
}