
function RecursiveCircles()
{
    let circles = [];

    class Circle
    {
        constructor(radius, x, y, rads)
        {
            this.radius = radius;
            this.start_rads = this.radians = rads;
            this.center_x = x;
            this.center_y = y;
            this.x = this.radius * Math.cos(this.radians);
            this.y = this.radius * Math.sin(this.radians);
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

                this.draw(last_point);
                this.iterations ++;
            }
            else if (this.radius > (canvas.width / 300))
            {
                circles.push(new Circle(this.radius / 2, this.center_x + this.radius, this.center_y, Math.PI));
                circles.push(new Circle(this.radius / 2, this.center_x - this.radius, this.center_y, 0));
                circles.push(new Circle(this.radius / 2, this.center_x, this.center_y + this.radius, Math.PI / 2));
                circles.push(new Circle(this.radius / 2, this.center_x, this.center_y - this.radius, Math.PI * (3/4)));
                this.done = true;
            }
        }
        draw(last_point)
        {
            if (this.iterations >= 1)
            {
                c.beginPath()
            // c.strokeStyle = "#336600";
                c.lineWidth = 1;
                c.moveTo(last_point.x, last_point.y);
                c.lineTo(this.x, this.y);
                c.stroke();
                c.closePath();
            }
        }
        is_finished()
        {
            return this.done;
        }
    }


    circles.push(new Circle(canvas.width / 4, canvas.width / 2, canvas.height / 2, Math.PI / 2));
    circles.push(new Circle(canvas.width / 4, canvas.width / 4, canvas.height / 2, 0));
    circles.push(new Circle(canvas.width / 4, canvas.width * (3/4), canvas.height / 2, Math.PI));

    

    function animate() 
    {
        requestAnimationFrame(animate);
        let anim_finished = true;
        for (let i = 0; i < circles.length; i++)
        {
            if (!circles[i].is_finished())
            {
                circles[i].update();
                anim_finished = false;
            } 
        }

        if (anim_finished) alert(done);
    }
    if (animate()) return;
}

let strokeColors = ["#000000", "#EEB0B1", "#000000", "#EEB0B1"];
let fillColors = ["#F9A602", "#F25C05", "#EEB0B1", "#000000"];

let i = Math.floor(Math.random() * fillColors.length);
c.fillStyle = fillColors[i];
c.strokeStyle = strokeColors[i];

c.fillRect(0, 0, canvas.width, canvas.height);

RecursiveCircles()
