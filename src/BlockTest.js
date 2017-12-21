import Matter from 'matter-js'
import p5 from 'p5'


//window settings
var w = window.innerWidth;
var h = window.innerHeight;
var canvas;

//Drawing constants
var painting = false;
var currentPos;
var previousPos;
var shapes = [];

//Matter constants
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
//local Matter vars
var engine;
var world;
//mouse interaction vars
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var mConstraint;

//init sketch
const sketch = (p5) => {

//drawing method
function circ(x, y, w, h) {
  p5.background(0);

  var options = {
    friction : 0.9,
    restitution : 0.6
  }
  this.body = Bodies.circle(x, y, p5.dist(x, y, w, h), options);
  this.w = w;
  this.h = h;
  this.b = this.body.bounds;

  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;

    p5.fill(100)
    p5.stroke(255);
    p5.push();
    p5.translate(pos.x, pos.y)
    p5.ellipse(0, 0,p5.dist(x, y, this.w, this.h));
    p5.pop();
  }
}

p5.setup = function(){
  canvas = p5.createCanvas(w, h);
  p5.background(0);
  p5.ellipseMode(p5.RADIUS);

  currentPos = p5.createVector(0, 0);
  previousPos = p5.createVector(0, 0);

  //Matter init
  engine = Engine.create();
  world = engine.world;
  //mouse
  var mouse = Mouse.create(canvas.elt);
  var mousePar = {
    mouse: mouse,
    constraint: {
      stiffness: 0.9,
    }
  }
  mConstraint = MouseConstraint.create(engine, mousePar);
  mConstraint.mouse.pixelRatio = p5.pixelDensity();
  World.add(world, mConstraint);

  Engine.run(engine);
  //boundaries
  var params = {
    isStatic: true,
    friction: 0.5
  }
  var ground = Bodies.rectangle(w / 2, h, w, 10, params);
  var wall1 = Bodies.rectangle(0, h / 2, 10, h, params);
  var wall2 = Bodies.rectangle(w, h / 2, 10, h, params);
  //var top = Bodies.rectangle(width / 2, 0, width, 1, params);
  World.add(world, ground);
  World.add(world, wall1);
  World.add(world, wall2);
}

p5.draw = function() {
  if (painting == true){
    p5.background(0, 100);
  } else if (painting == false){
    p5.background(0);
  }
  //Draw shape
  //Grab mouse position
  currentPos.x = p5.mouseX;
  currentPos.y = p5.mouseY;

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].show();
  }
}
//stores initial click
p5.mousePressed = function() {
  painting = true;
  previousPos.x = p5.mouseX;
  previousPos.y = p5.mouseY;

}
//bakes the shape
p5.mouseReleased = function() {
    painting = false;
    shapes.push(new circ(previousPos.x, previousPos.y, currentPos.x, currentPos.y));
}
//draws guide lines
p5.mouseDragged = function() {
  p5.fill(0, 200);
  p5.stroke(255);
  p5.ellipse(previousPos.x, previousPos.y, p5.dist(previousPos.x, previousPos.y, currentPos.x, currentPos.y));

}

p5.windowResized = function() {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
}

}

new p5(sketch);
