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
        if(dist((mouseX - width / 2), (mouseY - height / 2), this.x, this.y) < this.d * scale)
        {
            return true;
        }
    }
    showBall(x, y)
    {
        this.x = x;
        this.y = y;
        fill(this.col)
        circle(this.x,this.y,this.d * scale)
    }
}