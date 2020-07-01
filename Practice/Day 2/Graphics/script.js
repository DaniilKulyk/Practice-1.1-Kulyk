var canvas = document.getElementById("canvas");
var px = canvas.getContext("2d");

class Graphics1d {
  
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 120 * 6,
    H = 100 * 6,
    f = function(x) { return x*x-9; }
  )
  
  {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
   
  evaluate() {
    this.values = new Map();
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W) this.values[i] = this.f(i);
    this.ev = 1;
    return this.values;
  }
  
  draw(
    dots = "red",
    lines = "green",
    zero = "indigo",
    gaps = "magenta",
    background = "gray"
  )
  {
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let 
    movex = this.W / (-this.xmin + this.xmax),
    movey = this.H / (-this.ymin + this.ymax),
    zerox = Math.abs(this.xmin) * movex,
    zeroy = Math.abs(this.ymin) * movey;
    px.fillStyle = background;
    px.fillRect(0, 0, z.W, z.H);
    px.beginPath();
    px.lineWidth = 2;
    px.strokeStyle = lines;
    px.moveTo(0, zeroy);
    px.lineTo(z.W, zeroy);
    px.moveTo(zerox, 0);
    px.lineTo(zerox, z.H);
    px.closePath();
    px.stroke();
    px.lineWidth = 0.2;
    px.strokeStyle = lines;
    for (let i = 0; i <= z.W; i += z.W / (Math.abs(z.xmin)+Math.abs(z.xmax)))
      for (let j = 0; j <= z.H; j += z.H / (Math.abs(z.ymin)+Math.abs(z.ymax)))
      {
        px.beginPath();
        px.moveTo(i, j);
        px.lineTo(i + z.W / (Math.abs(z.xmin) + Math.abs(z.xmax)), j);
        px.lineTo(i + z.W / (Math.abs(z.xmin) + Math.abs(z.xmax)), j + z.H / (Math.abs(z.ymin) + Math.abs(z.ymax)));
        px.lineTo(i, j + z.H / (Math.abs(z.ymin) + Math.abs(z.ymax)));
        px.closePath();
        px.stroke();
      }
    px.beginPath();
    px.lineWidth = 1;
    px.strokeStyle = dots;
    px.moveTo(zerox + this.xmin * movex, zeroy - this.f(this.xmin) * movey);
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W) {
      if (0) {
        px.stroke();
        px.closePath();
        px.beginPath();
        px.fillStyle = zero;
        px.arc(
          zerox + i * movex,
          zeroy - movey * this.values[i - 0.1],
          3,
          0,
          180
        );
        px.fill();
        px.closePath();
        px.beginPath();
      } else {
        px.lineTo(zerox + i * movex, zeroy - this.values[i] * movey);
      }
    }
    px.stroke();
    px.closePath();
    px.font = movex + "serif";
    px.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")", mn = "(" + this.xmin + ", " + this.ymin + ")";
    px.fillText(mx, zerox + this.xmax * movex - movex * (mx.length - 7), zeroy + this.ymin * movey + movex);
    px.fillText(mn, zerox + this.xmin * movex, zeroy + this.ymax * movey - movey);
  }

  autodraw(
    dots = "red",
    lines = "green",
    zero = "indigo",
    gaps = "magenta",
    background = "gray"
  ) {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);

    this.draw(dots, lines, zero, gaps, background);
  }
}

var z = new Graphics1d();
z.draw();