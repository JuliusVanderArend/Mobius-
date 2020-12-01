
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
var objects =[];
const moveSpeed = 0.4;




Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


var setup = function(){
  objects.push(rect = makeRect([0,0,0]));
  objects.push(rect = makeRect([0,3,0]));
  objects.push(rect = makeRect([0,-3,0]));
  objects.push(rect = makeRect([2,0,0]));
  objects.push(rect = makeRect([2,3,0]));
  objects.push(rect = makeRect([2,-3,0]));
}

var dist = 5

var renderFrame = function(){
  for (var i = 0; i < objects.length; i++){
    objects[i].rotateOBJY(0.02);
    objects[i].renderOBJ();
  }
  // rect.rotateOBJY(0.02);
  // rect.renderOBJ();
  // rect2.renderOBJ();
  
}

function makeRect(pos){
  var rect = new GObject([],pos);
   rect.tris.push(new Tri([[-3],[-1],[-1]],[[-3],[1],[-1]],[[3],[-1],[-1]]));
  rect.tris.push(new Tri([[3],[1],[-1]],[[-3],[1],[-1]],[[3],[-1],[-1]]));
  rect.tris.push(new Tri([[-3],[-1],[1]],[[-3],[1],[1]],[[3],[-1],[1]]));
  rect.tris.push(new Tri([[3],[1],[1]],[[-3],[1],[1]],[[3],[-1],[1]]));
  rect.tris.push(new Tri([[3],[1],[-1]],[[-3],[1],[1]],[[3],[1],[1]]));
  rect.tris.push(new Tri([[-3],[1],[-1]],[[-3],[1],[-1]],[[-3],[1],[1]]));
  rect.tris.push(new Tri([[3],[-1],[-1]],[[-3],[-1],[1]],[[3],[-1],[1]]));
  rect.tris.push(new Tri([[-3],[-1],[-1]],[[-3],[-1],[-1]],[[-3],[-1],[1]]));
  triLen = rect.tris.length
     for(var i =0; i < triLen; i++){
     rect.rotateOBJY(1.57)
  }
  return rect;
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