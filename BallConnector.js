class BallConnector
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.d = 10;

        this.connected = false;
        this.connectedTo = [];

        this.drawingLine = false;

        this.col = color(100);
    }
    mouseOverBall()
    {
        if(dist(mouseX, mouseY, this.x, this.y) < this.d)
        {
            return true;
        }
    }
    showBall(x, y)
    {
        this.x = x;
        this.y = y;
        fill(this.col)
        circle(this.x,this.y,this.d)
    }
}