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
