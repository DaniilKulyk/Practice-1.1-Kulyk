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
    canvas.width = this.W;
    canvas.height = this.H;
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
    for (let i = 0; i < this.W; i += sqx * movex)
    {
      px.beginPath();
      px.moveTo(i, 0);
      px.lineTo(i, this.H);
      px.closePath();
      px.stroke();
    }
    for (let j = 0; j < this.H; j += sqy * movey) 
    {
      px.beginPath();
      px.lineTo(0, j);
      px.lineTo(this.W, j);
      px.closePath();
      px.stroke();
    }
    px.beginPath();
    px.lineWidth = 1;
    px.strokeStyle = dots;
    px.moveTo(zerox + this.xmin * movex, zeroy - this.f(this.xmin) * movey);
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W) 
    {
      console.log(i, this.values[i]);
      if (i!=this.xmin)
      {
        let check1 = this.values[i];
        let check2 = this.values[i-(-this.xmin + this.xmax) / this.W] ;
        if(check1*check2 < 0 && (Math.abs(check1 - check2) > this.ymax - this.ymin)) 
        {
          px.stroke();
          px.closePath();
          px.beginPath();
          px.fillStyle = gaps;
          px.arc(zerox + i  * movex, zeroy - movey * this.ymax, movex / 10, 0, 180);
          px.arc(zerox + i  * movex, zeroy - movey * this.ymin, movex / 10, 0, 180);
          px.fill();
          px.closePath();
          px.beginPath();
        }
        else px.lineTo(zerox + i * movex, zeroy - this.values[i] * movey);
      }
      else px.lineTo(zerox + i * movex, zeroy - this.values[i] * movey);
    }
    px.stroke();
    px.closePath();
    px.font = "25px Times New Roman";
    px.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")", mn = "(" + this.xmin + ", " + this.ymin + ")";
    px.fillText(mx, zerox + this.xmax * movex - (20 * mx.length) / 1.8, zeroy + this.ymin * movey + 25);
    px.fillText(mn, zerox + this.xmin * movex + 5, zeroy + this.ymax * movey - 10);
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

var sqx = 1, sqy = 1;
var z = new Graphics1d();
z.draw();

function replaceSpecialSequence(str) {
    str = str.split("cos").join("Math.cos");
    str = str.split("sin").join("Math.sin");
    str = str.split("tan").join("Math.tan");
    str = str.split("aMath.cos").join("Math.acos");
    str = str.split("aMath.sin").join("Math.asin");
    str = str.split("aMath.tan").join("Math.atan");
    str = str.split("pi").join("Math.PI");
    str = str.split("ln2").join("Math.LN2");
    str = str.split("ln10").join("Math.LN10");
    str = str.split("log2e").join("Math.LOG2E");
    str = str.split("log10e").join("Math.LOG10E");
    str = str.split("sqrt1_2").join("Math.SQRT1_2");
    str = str.split("sqrt2").join("Math.SQRT2");
    str = str.split("abs").join("Math.abs");
    str = str.split("ceil").join("Math.ceil");
    str = str.split("exp").join("Math.exp");
    str = str.split("floor").join("Math.floor");
    str = str.split("ln").join("Math.log");
    str = str.split("max").join("Math.max");
    str = str.split("min").join("Math.min");
    str = str.split("pow").join("Math.pow");
    str = str.split("round").join("Math.round");
    str = str.split("lg").join("logab");
    str = str.split("sqrt").join("Math.sqrt");
    str = str.split("e").join("Math.E");
    return str;
}

function built(){
var xmin = parseFloat(document.getElementById("xmin").value),
    xmax = parseFloat(document.getElementById("xmax").value),
    ymin = parseFloat(document.getElementById("ymin").value),
    ymax = parseFloat(document.getElementById("ymax").value),
    W = parseFloat(document.getElementById("W").value),
    H = parseFloat(document.getElementById("H").value),
    f = document.getElementById("f").value;
    sqx = document.getElementById("sqx").value;
    sqy = document.getElementById("sqy").value;
f = replaceSpecialSequence(f);
console.log(f);
var m = function(x){return eval(f)};
z = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
z.draw();
}