c.fillStyle = "#F25C05";
c.fillRect(0, 0, canvas.width, canvas.height);

function RecursiveCircles(strokeColor)
{
    c.strokeStyle = strokeColor;
    let circles = [];

    class Circle
    {
        constructor(radius, x, y, rads)
        {
            this.radius = radius;
            this.start_rads = rads;
            this.center_x = x;
            this.center_y = y;
            this.radians = rads;
            this.x = this.radius * Math.cos(this.radians);
            this.y = this.radius * Math.sin(this.radians);
            //console.log("Radius: ", radius, " | Position: ", this.x, this.y);
            this.iterations = 0;
            this.done = false;
        }
        update() 
    {          
            if (this.radians <= (2 * Math.PI) + this.start_rads)
            {
                this.radians += (1 / (Math.sqrt(this.radius * 5)));
                const last_point = {x: this.x, y: this.y};
                
                this.x = this.center_x + (this.radius * Math.cos(this.radians));
                this.y = this.center_y + (this.radius * Math.sin(this.radians));

            // console.log(this.x, this.y);
                this.draw(last_point);
                this.iterations ++;
            }
            else if (this.radius > 6)
            {
                console.log("Creating new circles");
                circles.push(new Circle(this.radius / 2, this.center_x + this.radius, this.center_y, Math.PI));
                circles.push(new Circle(this.radius / 2, this.center_x - this.radius, this.center_y, 0));
                circles.push(new Circle(this.radius / 2, this.center_x, this.center_y + this.radius, Math.PI / 2));
                circles.push(new Circle(this.radius / 2, this.center_x, this.center_y - this.radius, Math.PI * (3/4)));
                this.done = true;
            }
            else this.done = true;
        }
        draw(last_point)
        {
            if (this.iterations >= 1)
            {
                c.beginPath()
            // c.strokeStyle = "#336600";
                c.lineWidth = 2;
                c.moveTo(last_point.x, last_point.y);
                c.lineTo(this.x, this.y);
                c.stroke();
                c.closePath();
            }
            //c.fillRect(this.x, this.y, 3, 3);

        }
    }


    circles.push(new Circle(canvas.width / 4, canvas.width / 2, canvas.height / 2, Math.PI / 2));
    circles.push(new Circle(canvas.width / 4, canvas.width / 4, canvas.height / 2, 0));
    circles.push(new Circle(canvas.width / 4, canvas.width * (3/4), canvas.height / 2, Math.PI));

    let colorArray = [
        '#2DDFFF',
        '#F5F474',
        '#E33CC7',
        '#FFAA47',
        '#F54D28'];

    function animate() 
    {
        requestAnimationFrame(animate);

        for (let i = 0; i < circles.length; i++)
        {
            if (!circles[i].done)
            {
                circles[i].update();
            } 
        }
    }
    animate();
}

RecursiveCircles("#E5CB90");