

  objects.push(scene = new GObject([],[0,0,0]));

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


var setup = function(){
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
  drawmap()
}

var dist = 5
var distInit = 5

var renderFrame = function(){
  clearCTX();
  for (var i = 0; i < objects.length; i++){
    // objects[i].rotateOBJY(0.02);
    // objects[i].rotateOBJX(0.02);
    // objects[i].rotateOBJZ(0.02);
    objects[i].renderOBJ();
    drawStars();
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

function getMesh(mesh){
  var out = []
  for (face in mesh){
    out.push(new Tri(mesh[face][0],mesh[face][1],mesh[face][2]));
  }
  return out
}


// setup()
renderFrame();
document.addEventListener('keydown', function(event) {
    if(event.key == "a" && activeOBJ == canvas) {
       gloabalOffset = [gloabalOffset[0]+moveSpeed,gloabalOffset[1],gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.key == "d" && activeOBJ == canvas) {
       gloabalOffset = [gloabalOffset[0]-moveSpeed,gloabalOffset[1],gloabalOffset[2]]
       clearCTX();
       renderFrame();
    }
    if(event.key == "w" && activeOBJ == canvas) {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]+moveSpeed]
       clearCTX();
       renderFrame();
    }
    if(event.key == "s" && activeOBJ == canvas) {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1],gloabalOffset[2]-moveSpeed]
       clearCTX();
       renderFrame();
    }
    if(event.key == "q" && activeOBJ == canvas) {
       gloabalOffset = [gloabalOffset[0],gloabalOffset[1]+moveSpeed,gloabalOffset[2]]
       clearCTX();
       renderFrame(); 
    }
    if(event.key == "e" && activeOBJ == canvas) {
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
function canvasActive(){
  activeOBJ = canvas
  canvas.style.borderWidth = "thick"
  map.style.borderWidth = "thin"
}

function mapActiveFunc(){
  activeOBJ = map
  map.style.borderWidth = "thick"
  canvas.style.borderWidth = "thin"
}

function inputActive(){
  activeOBJ = input
  input.style.borderWidth = "thick"
  canvas.style.borderWidth = "thin"
  map.style.borderWidth = "thin"
}

function start(){
  drawmap()
  setSceneMesh(startMesh)
  scene.pos = [25,0,-5]
  output.innerHTML = "You are a lone engineer stranded aboard the USC Mobius. You must repair the ship and contact help.<br><br>The controls are:<br><br>WASDQE to move the camera when the room veiw is selected<br><br>N/North,S/South/ect...<br><br>Go + a location<br><br>Look + an object<br><br>Take + an object<br><br>Use + an object<br><br>Fix + an object<br><br>Type help for a list of objects and actions as well as hints.<br><br> A large number of verb and object varriations are supported, feel free to change the wording of your commands."
  resolution = 4
  function startScreen(){
    clearCTX();
    ctx.font = "40px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillText("Type Start To start the game", canvas.width/2 ,300)
    ctx.font = "20px Lucida Console";
    ctx.fillText("Mobius - Julius Vander Arend 2020", canvas.width/2 ,350)

    scene.rotateOBJX(0.1)
    scene.rotateOBJZ(0.1)
    scene.renderOBJ()
    drawStars()
    if(gameStart){
      ctx.textAlign = "left";
      resolution = 4
      window.clearInterval(inter)
      clearCTX()
      scene.pos = [0,0,0]
      setSceneMesh(quartersMesh)
      renderFrame()
      output.innerHTML = "You are in the sleeping quarters. You hear a shrill beepping as you drag yourself out of your hypersleep chamber, it is odly quiet today....."  
    }
  }

  var inter = window.setInterval(startScreen,40)
  
}

start()