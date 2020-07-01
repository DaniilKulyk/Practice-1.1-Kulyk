var canvas2 = document.getElementById("canvas2");
var pxx = canvas2.getContext("2d");

class Graphics2d {
  
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x,y) { return x*x+y*y-81; }
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
    for (let i = this.xmin; i <= this.xmax;i += (-this.xmin + this.xmax) / this.W) 
      for(let j = this.ymin; j <= this.ymax; j += (-this.ymin + this.ymax) / this.H) this.values[[i, j]] = this.f(i, j);
    this.ev = 1;
  }
  
  draw(
    dots = "red",
    lines = "green",
    zero = "indigo",
    gaps = "magenta",
    background = "gray"
  )
  {
    canvas2.width = this.W;
    canvas2.height = this.H;
    var drawed = new Graphics2d();
    if (this.ev == 0) this.evaluate();
    let 
    movex = this.W / (-this.xmin + this.xmax),
    movey = this.H / (-this.ymin + this.ymax),
    zerox = Math.abs(this.xmin) * movex,
    zeroy = Math.abs(this.ymin) * movey;
    pxx.fillStyle = background;
    pxx.fillRect(0, 0, zz.W, zz.H);
    pxx.beginPath();
    pxx.lineWidth = 2;
    pxx.strokeStyle = lines;
    pxx.moveTo(0, zeroy);
    pxx.lineTo(zz.W, zeroy);
    pxx.moveTo(zerox, 0);
    pxx.lineTo(zerox, zz.H);
    pxx.closePath();
    pxx.stroke();
    pxx.lineWidth = 0.2;
    pxx.strokeStyle = lines;
    for (let i = 0; i < this.W; i += sqx1 * movex){
      pxx.beginPath();
      pxx.moveTo(i, 0);
      pxx.lineTo(i, this.H);
      pxx.closePath();
      pxx.stroke();
    }
    for (let j = 0; j < this.H; j += sqy1 * movey) {
      pxx.beginPath();
      pxx.lineTo(0, j);
      pxx.lineTo(this.W, j);
      pxx.closePath();
      pxx.stroke();
    }
    pxx.lineWidth = 1;
    pxx.strokeStyle = dots;
    for (let i = this.xmin;i <= this.xmax;i += (-this.xmin + this.xmax) / this.W) 
      for(let j = this.ymin; j <= this.ymax; j += (-this.ymin + this.ymax) / this.H)
      {
        pxx.beginPath();
        if(this.values[[i, j]] < 0) pxx.fillStyle = "rgba(0, 0, 255, 0.2)";
        else if(this.values[[i, j]] > 0) pxx.fillStyle = "rgba(255, 0, 0, 0.2)";
        else if(this.values[[i, j]] == 0) pxx.fillStyle = "rgba(255, 255, 255, 0.2)";
        pxx.arc(zerox + i * movex, zeroy - j * movey, 1, 0, 360);
        pxx.fill();
        pxx.closePath()
      }
    pxx.font = "25px Times New Roman";
    pxx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")", mn = "(" + this.xmin + ", " + this.ymin + ")";
    pxx.fillText(mx, zerox + this.xmax * movex - (20 * mx.length) / 1.8, zeroy + this.ymin * movey + 25);
    pxx.fillText(mn, zerox + this.xmin * movex + 5, zeroy + this.ymax * movey - 10);
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

var sqx1 = 1, sqy1 = 1;
var zz = new Graphics2d();
zz.draw();

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

function built_1(){
var xmin1 = parseFloat(document.getElementById("xmin1").value),
    xmax1 = parseFloat(document.getElementById("xmax1").value),
    ymin1 = parseFloat(document.getElementById("ymin1").value),
    ymax1 = parseFloat(document.getElementById("ymax1").value),
    W1 = parseFloat(document.getElementById("W1").value),
    H1 = parseFloat(document.getElementById("H1").value),
    f1 = document.getElementById("f1").value;
    sqx1 = document.getElementById("sqx1").value;
    sqy1 = document.getElementById("sqy1").value;
f1 = replaceSpecialSequence(f1);
var m1 = function(x,y){return eval(f1)};
zz = new Graphics2d(xmin1, xmax1, ymin1, ymax1, W1, H1, m1);
zz.draw();
}