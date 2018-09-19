var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c = canvas.getContext('2d');
// c.fillStyle='rgba(255,100,0,5)'
// c.fillRect(100,100,100,100)

console.log(canvas);
// animate();
//Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle="#fa45ab";
// c.stroke();

//Arc/Circle

// c.beginPath();
// c.arc(300,300,30,0.0,Math.PI*2,false);
// c.strokeStyle="green";
// c.stroke();

// for(var i=0;i<500;++i) {
// 	c.beginPath();

// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	var r = Math.random() * 255;
// 	var g = Math.random() * 255;
// 	var b = Math.random() * 255;
// 	c.arc(x,y,30,0.0,Math.PI*2,false);
// 	c.strokeStyle='rgb(' + r + ',' + g + ',' + b + ')';
// 	c.stroke();
// }

var mouse = {
	x :undefined,
	y: undefined
}

var maxRadius = 50;
var minRadius = 5;

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})
function Circle(x,y,dx,dy,radius) {
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius = radius;
	this.r = Math.random() * 255;
	this.g = Math.random() * 255;
	this.b = Math.random() * 255;
	this.minRadius = radius;
	//this.color = 'rgb(' + r + ',' + g + ',' + b + ')';

	this.draw = function() {

		
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		//c.strokeStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
		c.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';;
		//c.stroke();
		c.fill();

	}

	this.update = function() {

		if(this.x+this.radius>=innerWidth || this.x-this.radius<=0)
		{
			this.dx=-this.dx;
			
		}
		if(this.y+this.radius>=innerHeight || this.y-this.radius<=0)
		{
			
			this.dy=-this.dy;

		}
		this.y = this.y + this.dy;
		this.x = this.x + this.dx;
		
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if(this.radius < maxRadius)
				this.radius++;
		}
		else {
			if(this.radius<this.minRadius)
				this.radius = this.minRadius;
			else
				this.radius --;
		}

		
		this.draw();

		
	}
}

// var circle = new Circle(200, 200, 5, 5, 10);
//circle.draw();

var circleArray = [];

function init() {
	circleArray = [];
	for (var i = 0; i < 500; ++i) {

	var radius = Math.random() * 9 + 1;
	var x = Math.random() * (window.innerWidth - radius * 2 ) + radius;
	var y = Math.random() * (window.innerHeight - radius * 2 ) + radius;
	var dx = (Math.random() - 0.5)*2;
	var dy = (Math.random() - 0.5)*2;

	circleArray.push(new Circle(x,y,dx,dy,radius));

}
}

function animate() {

	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
				
	//circle.update();
	for (var i = 0; i < circleArray.length; ++i) {
		circleArray[i].update();	
	}
	
}
init();
animate();
