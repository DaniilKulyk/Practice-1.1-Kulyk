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
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array (this.H * this.W);
    let counter = 0;
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W)
      for (let j = this.ymin; j <= this.ymax; j += (-this.ymin + this.ymax) / this.H) 
      {
        this.dots[counter] = [i, j];
        this.fvalues[counter++] = this.f(i, j);
      }
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
    
    console.log(this.fvalues.length, this.dots.length);
    for (let i = 0; i < this.W * this.H; i++) {
      pxx.beginPath();
      if (this.fvalues[i] < 0) pxx.fillStyle = "rgba(0, 0, 255, 0.2)";
      else if (this.fvalues[i] > 0) pxx.fillStyle = "rgba(255, 0, 0, 0.2)";
      else if (this.fvalues[i] == 0) pxx.fillStyle = "rgba(255, 255, 255, 0.2)";
      
      pxx.arc(zerox + this.dots[i][0] * movex, zeroy - this.dots[i][1] * movey, 1, 0, 360);
      pxx.fill();
      pxx.closePath();
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

function HELP() {
  document.getElementById("xmin1").value = "-20";
  document.getElementById("xmax1").value = "20";
  document.getElementById("ymin1").value = "-20";
  document.getElementById("ymax1").value = "20";
  document.getElementById("f1").value =
    "((abs(x-y+10)+abs(x+y)-10)*((x+2)*(x+3)+(y-5)*(y-5)-4)*((y-10)*(y-x-20)*(y+x-10)))*(abs(x*2.5-y+22.5)+abs(x*2.5+y+15.5)-7)*((x+7)*(x+7)+(y-3)*(y-3)-0.05)*(abs(x+5)+abs(y-12)-1.5)*(((x+7)*(x+7)+((y+5.6)*(y+5.6)))-3)*(((((x+8)*(x+8))/0.9)+((y+7.5)*(y+7.5))/0.06)-1)*(((((x+6)*(x+6))/0.9)+((y+7.5)*(y+7.5))/0.06)-1)*((((x*cos(-1)-y*sin(-1)+10)*(x*cos(-1)-y*sin(-1)+10))/25 + ((x*sin(-1)+y*cos(-1)-4.5)*(x*sin(-1)+y*cos(-1)-4.5))/3) - 0.04)*((((x*cos(-0.4)-y*sin(-0.4)+6)*(x*cos(-0.4)-y*sin(-0.4)+6))/25 + ((x*sin(-0.4)+y*cos(-0.4)+3.2)*(x*sin(-0.4)+y*cos(-0.4)+3.2))/3) - 0.05)*((((x*cos(3.4)-y*sin(3.4)-6)*(x*cos(3.4)-y*sin(3.4)-6))/0.2 + ((x*sin(3.4)+y*cos(3.4)-4.1)*(x*sin(3.4)+y*cos(3.4)-4.1))/3.3) - 0.7)*((((x*cos(-0.4)-y*sin(-0.4)+8.8)*(x*cos(-0.4)-y*sin(-0.4)+8.8))/0.2 + ((x*sin(-0.4)+y*cos(-0.4)-0.8)*(x*sin(-0.4)+y*cos(-0.4)-0.8))/3.3) - 0.7)*(((x+7.8)*(x+7.8)+(y+5.4)*(y+5.4))-0.1)*(((x+6.3)*(x+6.3)+(y+5.4)*(y+5.4))-0.1)*((((x*cos(-0.4)-y*sin(-0.4)+8.9)*(x*cos(-0.4)-y*sin(-0.4)+8.9))/2 + ((x*sin(-0.4)+y*cos(-0.4)+3.2)*(x*sin(-0.4)+y*cos(-0.4)+3.2))/0.3) - 0.1)*((x+6.3)*(x+6.3)+(x+5.4)*(x+5.4)-0.2)*(((x-7)*(x-7)+(y+5.6)*(y+5.6))-3)*(((x-8)*(x-8)+(y+7.6)*(y+7.6))-0.2)*(((x-6)*(x-6)+(y+7.6)*(y+7.6))-0.2)*((((x*cos(3.4)-y*sin(3.4)+10.8)*(x*cos(3.4)-y*sin(3.4)+10.8))/25 + ((x*sin(3.4)+y*cos(3.4)-3)*(x*sin(3.4)+y*cos(3.4)-3))/3) - 0.05)*((((x*cos(-0.4)-y*sin(-0.4)-1.6)*(x*cos(-0.4)-y*sin(-0.4)-1.6))/25 + ((x*sin(-0.4)+y*cos(-0.4)+7)*(x*sin(-0.4)+y*cos(-0.4)+7))/3) - 0.05)*(((((x-7)*(x-7))/0.4)+(((y+6.5)*(y+6.5))/0.4))-0.1)*(((x-7.4)*(x-7.4)+(y+5.4)*(y+5.4))-0.1)*(abs(x-y-11.6)+abs(x+y-0.8)-1)*(((x-6.2)*(x-6.2)+(y+5.4)*(y+5.4))-0.1)*(abs(x-y-12.8)+abs(x+y-2)-1)*(((x-8.3)*(x-8.3)/0.7)+((x+5.4)*(x+5.4)/0.003)-0.2)*(((x-5.5)*(x-5.5)/0.7)+((x+5.4)*(x+5.4)/0.01)-0.03)*(((x-7)*(x-7)/0.9)+(y+3.9)*((y+3.9)/0.09)-2)*(abs(x*2.5-y-20.5)+abs(x*2.5+y-14.6)-2)";
  built_1();
}