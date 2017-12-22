import Matter from 'matter-js'
import p5 from 'p5'
import Dom from 'p5/lib/addons/p5.dom'


//window settings
var w = window.innerWidth;
var h = window.innerHeight;
var canvas;
var gravButton;
var shapeButton;

//Drawing constants
var painting = false;
var currentPos;
var previousPos;
var shapes = [];
var c = true;
var s = false;
var rectH;
var rectW;

//Matter constants
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner;
//local Matter vars
var engine;
var world;
var runner;
//mouse interaction vars
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var mConstraint;

//init sketch
const sketch = (p5) => {

  //drawing method
  function circ(x, y, w, h) {

    var options = {
      friction : 0.9,
      restitution : 0.6
    }
    this.body = Bodies.circle(x, y, p5.dist(x, y, w, h), options);
    this.w = w;
    this.h = h;
    this.b = this.body.bounds;

    World.add(world, this.body);

    this.isOffCanvas = function(){
      var pos = this.body.position;
      return (pos.y < 0);
    }

    this.forget = function(){
      World.remove(world, this.body);
    }

    this.show = function() {
      var pos = this.body.position;

      p5.fill(40);
      p5.stroke(40);
      p5.push();
      p5.translate(pos.x, pos.y)

      p5.ellipse(0, 0,p5.dist(x, y, this.w, this.h));
      p5.pop();
    }
  }

  function square(x, y, w, h) {

    var options = {
      friction : 0.9,
      restitution : 0.6,
      angle: 0
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.b = this.body.bounds;

    World.add(world, this.body);

    this.isOffCanvas = function(){
      var pos = this.body.position;
      return (pos.y < 0);
    }

    this.forget = function(){
      World.remove(world, this.body);
    }

    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;

      p5.fill(40)
      p5.stroke(40);
      p5.push();
      p5.rectMode(p5.CENTER);
      p5.translate(pos.x, pos.y);
      p5.rotate(angle);
      p5.rect(0, 0, this.w, this.h);
      p5.pop();

    }
  }


function toggleGravity() {

  if(runner.enabled == false){
    gravButton.style("background-color", p5.color(255, 50, 50));
    runner.enabled = true;
    Runner.start(runner, engine);
  } else if (runner.enabled == true) {
    gravButton.style("background-color", p5.color(250, 130, 40));
    Runner.stop(runner)
    runner.enabled = false;
  }

}

function toggleShape() {
  if (c == true) {
    shapeButton.style("background-color", p5.color(255, 50, 50));
    s = true;
    c = false;
  } else if (c == false) {
    shapeButton.style("background-color", p5.color(250, 130, 40));
    c = true;
    s = false;
  }
}

p5.setup = function(){
  canvas = p5.createCanvas(w, h);
  p5.background(0);
  p5.ellipseMode(p5.RADIUS);

  var titleButton = p5.createButton('Malevi.ch');
  titleButton.position(20, 20);
  //gravity button
  gravButton = p5.createButton('GRAVITY');
  gravButton.position(w/2 - 170, 20);
  gravButton.mousePressed(toggleGravity);

  //shapes button
  shapeButton = p5.createButton('SHAPE');
  shapeButton.position(w/2 + 30, 20);
  shapeButton.mousePressed(toggleShape);

  currentPos = p5.createVector(0, 0);
  previousPos = p5.createVector(0, 0);

  //Matter init
  engine = Engine.create();
  world = engine.world;
  runner = Runner.create();
  runner.enabled = false;
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
//p5 Draw
p5.draw = function() {

  if (painting == true){
    p5.background(230, 50);
  } else if (painting == false){
    p5.background(230);
  }
  //Draw shape
  //Grab mouse position
  currentPos.x = p5.mouseX;
  currentPos.y = p5.mouseY;

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].show();
    if (shapes[i].isOffCanvas()) {
      shapes[i].forget();
      shapes.splice(i, 1);
    }
  }

}
//stores initial click
p5.mousePressed = function() {
  painting = true;
  p5.noStroke();
  previousPos.x = p5.mouseX;
  previousPos.y = p5.mouseY;

}
//bakes the shape
p5.mouseReleased = function() {

    painting = false;
    if (mConstraint.body == null) {

      if (c == true){
        shapes.push(new circ(previousPos.x, previousPos.y, currentPos.x, currentPos.y));

      } else if (s == true) {
        shapes.push(new square(previousPos.x, previousPos.y, rectW, rectH));
      }
    }
}
//draws guide lines
p5.mouseDragged = function() {
  painting = true;
  //rectangle geometry calc
  var rh = p5.sq(p5.dist(previousPos.x, previousPos.y, currentPos.x, currentPos.y));
  var rh2 = p5.sq(p5.dist(previousPos.x, 0, currentPos.x, 0));
  rectH = p5.sqrt(rh-rh2);
  var rw = p5.sq(p5.dist(previousPos.x, previousPos.y, currentPos.x, currentPos.y));
  var rw2 = p5.sq(p5.dist(0, previousPos.y, 0, currentPos.y));
  rectW = p5.sqrt(rw-rw2);

  p5.fill(230, 200);
  p5.stroke(40);
    if (c == true) {
      p5.ellipse(previousPos.x, previousPos.y, p5.dist(previousPos.x, previousPos.y, currentPos.x, currentPos.y));
    } else if (s == true) {
      p5.rectMode(p5.CENTER);
      p5.rect(previousPos.x, previousPos.y, rectW, rectH);
    }


}

p5.windowResized = function() {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
}

}

new p5(sketch);
