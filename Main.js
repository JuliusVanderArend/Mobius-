



Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


var setup = function(){
  objects.push(scene = new GObject([],[0,0,0]));
  // objects.push(rect = makeRect([0,3,0]));
  // objects.push(rect = makeRect([0,-3,0]));
  // objects.push(rect = makeRect([2,0,3]));
  // objects.push(rect = makeRect([2,3,3]));
  // objects.push(rect = makeRect([2,-3,3]));
  for (face in bridgeMesh){
    scene.tris.push(new Tri(bridgeMesh[face][0],bridgeMesh[face][1],bridgeMesh[face][2]));
  }
  console.log(scene.tris.length);
  // scene.rotateOBJZ(-3.15)
  // scene.rotateOBJY(1.6)
}

var dist = 5

var renderFrame = function(){
  clearCTX();
  for (var i = 0; i < objects.length; i++){
    // objects[i].rotateOBJY(0.02);
    // objects[i].rotateOBJX(0.02);
    // objects[i].rotateOBJZ(0.02);
    objects[i].renderOBJ();
    
  }

  
}

function setSceneMesh(mesh){
  scene.tris = []
  for (face in mesh){
    scene.tris.push(new Tri(mesh[face][0],mesh[face][1],mesh[face][2]));
  }
  console.log(scene.tris.length)
  renderFrame();
}


setup()
renderFrame();
document.addEventListener('keydown', function(event) {
    if(event.key == "a" && input.value == "") {
       gloabalOffset = [gloabalOffset[0]+moveSpeed,gloabalOffset[1],gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.key == "d" && input.value == "") {
       gloabalOffset = [gloabalOffset[0]-moveSpeed,gloabalOffset[1],gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.key == "w" && input.value == "") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]+moveSpeed]
       clearCTX();
       renderFrame();
    }
    if(event.key == "s" && input.value == "") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]-moveSpeed]
       clearCTX();
       renderFrame();
    }
    if(event.key == "q" && input.value == "") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1]+moveSpeed,gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.key == "e" && input.value == "") {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1]-moveSpeed,gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.keyCode == 13){
      takeInput();
    }
    else{

    }
});
// window.setInterval(renderFrame,40);


// for(var i=0; i <1; i++){
//   renderFrame()
// }