var angle = 0.0;
var speed = 0.05;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noFill( );
}

function xiaosvehicle() {

  
  
  background(255);
  
  translate(width/2, height/2);
  rotate(angle);
  for (var i=0; i<5; i++) {
	push();
	rotate(i*TWO_PI/5);
	translate(0, 10);
	ellipse(0, 0, 20, 20);
	pop();
  }

  angle += speed;
}
