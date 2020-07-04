var graph = document.getElementById("C1");
var px = graph.getContext("2d");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Graphics1D
{
    xmin = -5;
    xmax = 5;
    ymin = -5;
    ymax = 5;
    W = 512;
    H = 512;
    Fmax = this.ymin; 
    Fmin = this.ymax;
    f = function (x) { return x*x-9; };
    zer = new Map();
    zerocount = 0;
    evaluate()
    {
        this.buf = new Map();
        this.Fmax = 0; this.Fmin=0;
        for(let x=this.xmin; x<this.xmax; x += (-this.xmin + this.xmax) / this.W)
        {
            var res  = this.f(x);
            this.buf[x] = res;
            this.Fmax = Math.max(this.Fmax,res);
            this.Fmin = Math.min(this.Fmin,res);
        }
    }
    draw(dots = "red", axis = "lime", zeros = "indigo", gaps = "magenta", bg = "gray")
    {
        this.evaluate();
        let stepx = this.W / (-this.xmin + this.xmax), stepy = this.H / (-this.ymin + this.ymax),
            zerox = -this.xmin * stepx, zeroy = this.ymax * stepy;
        console.log("In draw: ");
        console.log("xmin: "+this.xmin+" xmax "+this.xmax+" ymin "+this.ymin+" ymax "+this.ymax+" Fmin,Fmax "+this.Fmin+" "+this.Fmax);
        console.log("stepx: "+stepx+" stepy "+stepy);
        console.log("zerox:"+zerox+" zeroy "+zeroy);

        px.fillStyle = bg;
        px.fillRect(0, 0, this.W, this.H);

        px.beginPath();
        px.lineWidth = 2;
        px.strokeStyle = axis;
        px.moveTo(0, zeroy);
        px.lineTo(this.W, zeroy);
        px.moveTo(zerox, 0);
        px.lineTo(zerox, this.H);
        px.closePath();
        px.stroke();
        px.lineWidth = 0.3;
        px.strokeStyle = axis;
        for(let i=0;i<=this.W;i+=stepx)
        {
            px.beginPath();
            px.moveTo(i,0);
            px.lineTo(i,this.H);
            px.closePath();
            px.stroke();
        }
        for(let j=0;j<=this.H;j+=stepy)
        {
            px.beginPath();
            px.moveTo(0,j);
            px.lineTo(this.W,j);
            px.closePath();
            px.stroke();
        }
        px.beginPath();
        px.lineWidth = 1;
        px.strokeStyle = dots;
        px.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
        console.log("drawing: "+this.ymin+" "+this.ymax);
        this.zerocount = 0;
        this.zer.clear();
        for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W)
        {
            if (i!=this.xmin)
            {
                let cur = this.buf[i];
                let prev = this.buf[i - (-this.xmin + this.xmax) / this.W] ;
                if((cur*prev < 0) || (cur==0))
                {
                    if((Math.abs(cur - prev) > this.ymax - this.ymin)) //gaps
                    {
                        //console.log(cur+" "+prev);
                        px.stroke();
                        px.closePath();
                        px.beginPath();
                        px.fillStyle = gaps;
                        px.arc(zerox + i * stepx, zeroy, stepx / 10, 0, 180);
                        px.fill();
                        px.closePath();
                        px.beginPath();
                    }
                    else
                    {
                        this.zerocount++;
                        this.zer[this.zerocount] = i;
                        //console.log("found root while drawing: "+cur+" "+prev+" "+i);
                        px.stroke();
                        px.closePath();
                        px.beginPath();
                        px.fillStyle = zeros;
                        px.arc(zerox + i * stepx, zeroy, stepx / 10, 0, 180);
                        px.fill();
                        px.closePath();
                        px.beginPath();
                        let backwards = i - (-this.xmin + this.xmax) / this.W;
                        px.moveTo(zerox + backwards*stepx,zeroy - this.buf[backwards]*stepy);
                        px.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
                    }
                }
                else px.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
            }
            else px.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
        }
      
      
        px.stroke();
        px.closePath();


        px.font = "25px Times New Roman";
        px.textBaseline = 'ideographic';
        px.fillStyle = "black";
        let mx = "(" + this.xmax + ", " + this.ymax + ")", mn = "(" + this.xmin + ", " + this.ymin + ")";
        px.fillText(
            mx,
            zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
            zeroy - this.ymax * stepy + 25
        );
        px.fillText(mn, zerox + this.xmin * stepx, zeroy - this.ymin * stepy);
    }

    autodraw(dots = "red", axis = "lime", zeros = "indigo", gaps = "magenta", bg = "gray")
    {
        this.evaluate();
        this.ymin = this.Fmin;
        this.ymax = this.Fmax;
        console.log("autodraw "+this.Fmin+" "+this.Fmax);
        this.draw(dots, axis, zeros, gaps, bg);
    }


}

function replaceSpecialSequence(str) {
    //Тригонометрические функции
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

var x = new Graphics1D();
x.draw();


function build() //delete
{
    document.getElementById("status").innerText="";
    var If = document.getElementById("func").value,
        Ixmin = parseFloat(document.getElementById("xmin").value),
        Ixmax = parseFloat(document.getElementById("xmax").value),
        Iymin = parseFloat(document.getElementById("ymin").value),
        Iymax = parseFloat(document.getElementById("ymax").value),
        IW = 512,
        IH = 512;
    console.log(Ixmin, Ixmax, Iymin, IW, IH, If);
    x.H = IH;
    x.W = IW;
    document.getElementById("C1").width = IW;
    document.getElementById("C1").height = IH;
    x.xmax = Ixmax;
    x.xmin = Ixmin;
    x.ymax = Iymax;
    x.ymin = Iymin;
    x.f = function(x) { return eval(replaceSpecialSequence(If)); } 
    x.draw();
}



// function autoDraw() { //delete
//     document.getElementById("status").innerText="";
//     var If = document.getElementById("func").value,
//         Ixmin = parseFloat(document.getElementById("xmin").value),
//         Ixmax = parseFloat(document.getElementById("xmax").value),
//         Iymin = parseFloat(document.getElementById("ymin").value),
//         Iymax = parseFloat(document.getElementById("ymax").value),
//         IW = parseFloat(document.getElementById("W").value),
//         IH = parseFloat(document.getElementById("H").value);
//     console.log(Ixmin, Ixmax, Iymin, typeof (Iymax), IW, IH, If);
//     x.H = IH;
//     x.W = IW;
//     document.getElementById("C1").width = IW;
//     document.getElementById("C1").height = IH;
//     x.xmax = Ixmax;
//     x.xmin = Ixmin;
//     x.f = function(x) { return eval(replaceSpecialSequence(If)); }
//     x.autodraw();
// }

function InitializeFieldsForBisection()
{
    var
        Ixmin = parseFloat(document.getElementById("xmin").value),
        Ixmax = parseFloat(document.getElementById("xmax").value),
        Iymin = parseFloat(document.getElementById("ymin").value),
        Iymax = parseFloat(document.getElementById("ymax").value);
    //if(document.getElementById("gridlow").checked) x.gridAmplifier=parseFloat(document.getElementById("gridamp").value);
    x.xmax = Ixmax;
    x.xmin = Ixmin;
    x.ymax = Iymax;
    x.ymin = Iymin;
}


async function Bisection() {
    InitializeFieldsForBisection();
    document.getElementById("pointsholder").innerText="";
    let dx = parseFloat(document.getElementById("dx").value);
    
    var f = function(x) { return eval(replaceSpecialSequence(document.getElementById("func").value)); };
    let delay = parseFloat(document.getElementById("wait").value);
    //let force = parseFloat(document.getElementById("force").value);
    
    x.draw();

    let stepx = x.W / (-x.xmin + x.xmax), stepy = x.H / (-x.ymin + x.ymax),
        zerox = -x.xmin * stepx, zeroy = x.ymax * stepy;
    px.fillStyle = "white";
  
  
    var displayedpoints = 0;
    await sleep(delay);
  
    for(let i=1; i<=x.zerocount; i++)
    {
        document.getElementById("status").innerText="Находим "+i+"-й корень \n Последовательность приближений: \n";
        var xnow = x.zer[i];
        var xnext = xnow-1;
        var iterations = 0;
        document.getElementById("status").innerText+="X"+iterations+" = "+xnow+"\n";

        px.beginPath();
        px.arc(zerox + xnow * stepx, zeroy, stepx / 30, 0, 180);
        px.fill();
        px.closePath();

        await sleep(delay);
      
        while(Math.abs(xnext-xnow)>dx)
        {
            if(xnow == 0) 
            { 
              xnext = xnow; 
              break; 
            }
          
            xnext = (xnow + xnext) / 2;
            if(f(xnext)==0) break;
            if (Math.sign(f(xnext)) == Math.sign(f(xnow))) xnow = xnext;	 
		        
            
            iterations++;
            document.getElementById("status").innerText+="X"+iterations+" = "+xnext+"\n";

            px.beginPath();
            px.arc(zerox + xnext * stepx, zeroy, stepx / 30, 0, 180);
            px.fill();
            px.closePath();

            await sleep(delay);
          
            if(iterations>1000)
            {
                alert("ALERT! TO MANY REQUESTS");
                break;
            }
        }
      

        var root = (f(xnext+0.00001)*f(xnext-0.00001)>0);
        if(root)
        {
            displayedpoints++;
            var fnow = function(x) { return eval(replaceSpecialSequence(document.getElementById("func").value)); };
            document.getElementById("pointsholder").innerText += "x"+displayedpoints+" = " + xnext.toFixed(3) + " | f(x) = "+fnow(xnext).toFixed(3) + " | Количество итераций: "+iterations+"\n";
            document.getElementById("status").innerText+="Корень="+xnext.toFixed(3)+" найден с нужной точностью.";
        }
        //else document.getElementById("status").innerText+="Корень="+xnext+" найден с нужной точностью.";
      
      
        await sleep(delay*1.5);
    }
    if(displayedpoints==0) document.getElementById("pointsholder").innerText ="Корня не нашлось";
}