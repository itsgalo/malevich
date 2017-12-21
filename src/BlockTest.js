import Matter from 'matter-js'
import p5 from 'p5'

var w = window.innerWidth;
var h = window.innerHeight;
var canvas;
var scale = 1;

const sketch = (p5) => {

p5.setup = function(){
  canvas = p5.createCanvas(w, h);
  p5.background(0);
  p5.fill(255, 0, 0);
  p5.noStroke();

}

p5.draw = function() {
  p5.background(0);
  p5.ellipse(250, 250, scale, scale);
  scale += 1;

}
}

new p5(sketch);
