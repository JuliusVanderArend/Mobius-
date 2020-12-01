
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




Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


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
  }
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