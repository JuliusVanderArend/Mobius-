
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.font = "20px Arial";
var tris = [];
var scaleFactor = 300;
var angle = 0;
var resolution = 5;
var pixSize = 5;
var gloabalOffset = [0,0,0];
const moveSpeed = 0.4;

class Tri{
  constructor(v1,v2,v3,){
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v1Init = v1;
    this.v2Init = v2;
    this.v3Init = v3;
    this.offset = [0,0,0];
    this.v01 = v1;
    this.v02 = v2;
    this.v03 = v3;
  }

  render(){
    var pPoints = [];
    this.v01 = madd(this.v1,this.offset);
    this.v02 = madd(this.v2,this.offset);
    this.v03 = madd(this.v3,this.offset);
    pPoints.push(projectPoint(this.v01)); 
    pPoints.push(projectPoint(this.v02));
    pPoints.push(projectPoint(this.v03)); 
    // console.log(pPoints);
    var p0 = [pPoints[0][0]*scaleFactor/resolution,pPoints[0][1]*scaleFactor/resolution]
    var p1 = [pPoints[1][0]*scaleFactor/resolution,pPoints[1][1]*scaleFactor/resolution]
    var p2 = [pPoints[2][0]*scaleFactor/resolution,pPoints[2][1]*scaleFactor/resolution]
    var points =  drawLine(p0,p1);
    for(var i = 0; i < (points.length); i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }
    points =  drawLine(p1,p2);
    for(var i = 0; i < points.length; i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }
    points =  drawLine(p2,p0);
    for(var i = 0; i < points.length; i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }

    for (var i = 0; i < pPoints.length; i++){
      drawPix(70 * pPoints[i][2],pPoints[i][0]*scaleFactor+500,pPoints[i][1]*scaleFactor+ 250);
    }
  }

  rotateZ(angle){
    var rotMatrix = [
    [[Math.cos(angle)],[-Math.sin(angle)],[0]],
    [[Math.sin(angle)],[Math.cos(angle)],[0]],
    [[0],[0],[1]]]

    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }

  rotateY(angle){
    var rotMatrix = [
    [[Math.cos(angle)],[0],[Math.sin(angle)]],
    [[0],[1],[0]],
    [[-Math.sin(angle)],[0],[Math.cos(angle)]]
    ]
    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }

   rotateX(angle){
    var rotMatrix = [
    [[1],[0],[0]],
    [[0],[Math.cos(angle)],[-Math.sin(angle)]],
    [[0],[Math.sin(angle)],[Math.cos(angle)]]
    ]
    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }
}

function madd(){
      var arrays= arguments, results= [], 
      count= arrays[0].length, L= arrays.length, 
      sum, next= 0, i;
      while(next<count){
          sum= 0, i= 0;
          while(i<L){
              sum+= Number(arrays[i++][next]);
          }
          results[next++]= [sum];
      }
      return results;
    }

	drawLine = function(pos1, pos2)
	{
		var delta = pos2.map(function(value, index) { return value - pos1[index]; });
		var increment = delta.map(Math.sign);
		var absDelta = delta.map(Math.abs);
		var absDelta2 = absDelta.map(function(value) { return 2 * value; });
		var maxIndex = absDelta.reduce(function(accumulator, value, index) { return value > absDelta[accumulator] ? index : accumulator; }, 0);
		var error = absDelta2.map(function(value) { return value - absDelta[maxIndex]; });

		var result = [];
		var current = pos1.slice();
		for (var j = 0; j < absDelta[maxIndex]; j++)
		{
			result.push(current.slice());
			for (var i = 0; i < error.length; i++)
			{
				if (error[i] > 0)
				{
					current[i] += increment[i];
					error[i] -= absDelta2[maxIndex];
				}
				error[i] += absDelta2[i];
			}
		}
		result.push(current.slice());
		return result;
	};


var rotateZ = function(point,angle){
  rotMatrix = [
    [[Math.cos(angle)],[-Math.sin(angle)],[0]],
    [[Math.sin(angle)],[Math.cos(angle)],[0]],
    [[0],[0],[1]]
  ]
  // console.log(rotMatrix)
  return mmultiply(rotMatrix, point)
}

var rotateX = function(point,angle){
  rotMatrix = [
    [1,0,0]
    [0,Math.cos(angle),-Math.sin(angle)],
    [0,Math.sin(angle),Math.cos(angle)]
  ]
  // console.log(rotMatrix)
  return mmultiply(rotMatrix, point)
}


mmultiply = function (arrA, arrB) {
  // console.log(arrA)
  // console.log("")
  // console.log(arrB)
  if (arrA[0].length !== arrB.length) {
    throw new Error("Matrix mismatch");
  }

  var result = new Array(arrA.length);

  for (var x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length);
  }
  // console.log(arrB)
  // console.log("")
  // console.log(arrB_T)
  var arrB_T = mtranspose(arrB);
  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
      result[i][j] = mdotproduct(arrA[i], arrB_T[j]);
    }
  }
  return result;
};

mdotproduct = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vector mismatch");
  }

  var result = 0;
  for (var i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i];
  }
  return result;
};
mtranspose = function (arr) {
  var result = new Array(arr[0].length);

  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);

    for (var j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
};

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


var drawPix = function(size,x,y){
  ctx.font = size+ "px Arial";
  ctx.fillText("::",x,y);
}

var setup = function(){
  tris.push(new Tri([[-3],[-1],[-1]],[[-3],[1],[-1]],[[3],[-1],[-1]]));
  tris.push(new Tri([[3],[1],[-1]],[[-3],[1],[-1]],[[3],[-1],[-1]]));
  tris.push(new Tri([[-3],[-1],[1]],[[-3],[1],[1]],[[3],[-1],[1]]));
  tris.push(new Tri([[3],[1],[1]],[[-3],[1],[1]],[[3],[-1],[1]]));
  tris.push(new Tri([[3],[1],[-1]],[[-3],[1],[1]],[[3],[1],[1]]));
  tris.push(new Tri([[-3],[1],[-1]],[[-3],[1],[-1]],[[-3],[1],[1]]));
  tris.push(new Tri([[3],[-1],[-1]],[[-3],[-1],[1]],[[3],[-1],[1]]));
  tris.push(new Tri([[-3],[-1],[-1]],[[-3],[-1],[-1]],[[-3],[-1],[1]]));
  triLen = tris.length
     for(var i =0; i < triLen; i++){
     tris[i].rotateY(1.57)
  }
}

var dist = 5

var renderFrame = function(){
  triLen = tris.length
  for(var i =0; i < triLen; i++){
    tris[i].rotateX(0.02);
    tris[i].rotateZ(0.02)
    tris[i].rotateY(0.02)
    tris[i].offset= gloabalOffset;

    // if(dist - tris[i].v01[2] > 0 && dist - tris[i].v02[2] > 0 && dist - tris[i].v03[2] > 0){
    //   tris[i].render();
    // }
    tris[i].render();
    // console.log(gloabalOffset);
  }
}

var projectPoint = function(point){

  var n = (dist - point[2]).clamp(dist-3.8,1000);
  var z = (1/n)
  var projectionMatrix = [[z,0,0],[0,z,0],[0,0,0]]
  var out  = mmultiply(projectionMatrix,point)
  return[out[0][0],out[1][0],z]
}

var clearCTX = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


setup()
document.addEventListener('keydown', function(event) {
    if(event.key == "a") {
       gloabalOffset = [gloabalOffset[0]+moveSpeed,gloabalOffset[1],gloabalOffset[2]]
    }
    if(event.key == "d") {
       gloabalOffset = [gloabalOffset[0]-moveSpeed,gloabalOffset[1],gloabalOffset[2]]
    }
    if(event.key == "w") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]+moveSpeed]
    }
    if(event.key == "s") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]-moveSpeed]
    }
});
window.setInterval(renderFrame,10);
window.setInterval(clearCTX,30);
// for(var i=0; i <1; i++){
//   renderFrame()
// }