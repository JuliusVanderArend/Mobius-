	var lines = [":","::",":::","::::",":::::","::::::",":::::::"];
  
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

var drawPix = function(size,x,y){
  if(mapActive == false){
    ctx.font = size + "px Arial";
    // ctx.fillText(lines[Math.floor(Math.random() * lines.length)],x,y);
    ctx.fillText("::",x,y);
  }
  else{
    ctxM.font = 2 + "px Arial";
    ctxM.fillText("::",x,y);
    // console.log(x+" "+y)
    ctxM.font = "20px Lucida Console";
  }
}

var clearCTX = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStars(){
  ctx.font = 7 + "px Arial";
  for(var i = 0; i<100;i++){
    ctx.fillText(".",Math.floor(canvas.width*Math.random()),Math.floor(canvas.height*Math.random()));
  }
}
function getMesh(mesh){
  var out = []
  for (face in mesh){
    out.push(new Tri(mesh[face][0],mesh[face][1],mesh[face][2]));
  }
  return out
}
var mapOBJ = new GObject(getMesh(mapMesh),0,0,0)
var rMarkerOBJ =  new GObject(getMesh(roomMarkers),0,0,0)
var rMarkerNames = ["◘Engineering 2","◘C2","◘Medbay ","◘Coms","◘Sleeping Quarters","◘Reactor","◘Eng1","◘Airlock","◘Lounge","◘Bridge","◘C1"]
// mapOBJ.rotateOBJZ(1)
// rMarkerOBJ.rotateOBJX(1)
var block = "█"

function drawmap(){
  mapActive = true;
  ctxM.clearRect(0,0, 1000, 1000);
  ctxM.fillText("Map of the USC Mobius",12,30);
  ctxM.fillText("Stardate:2231",12,50);
  ctxM.fillText("N",map.width - 50,30);
  ctxM.fillText("W + E",map.width - 70,50);
  ctxM.fillText("S",map.width - 50,70);
  console.log(mapOffset)
  mapOBJ.pos = [-gloabalOffset[0]+17+mapOffset[0],-gloabalOffset[1]+mapOffset[1],-gloabalOffset[2]+mapOffset[2]-8]
  rMarkerOBJ.pos = [-gloabalOffset[0]+17+mapOffset[0],-gloabalOffset[1]+mapOffset[1],-gloabalOffset[2]+mapOffset[2]-8]
  resolution = 1
  dist = 8
  mapOBJ.renderOBJ()
  rMarkerOBJ.renderOBJ()
  for(var i = 0; i < rMarkerOBJ.tris.length;i++){
    ctxM.font = "bold 14px Lucida Console";
    ctxM.fillStyle = "white"
    ctxM.fillText(block.repeat(Math.floor(rMarkerNames[i].length * 0.9)+1),rMarkerOBJ.tris[i].screenSpace[0] +300,rMarkerOBJ.tris[i].screenSpace[1]+250)
    ctxM.font = "bold 12px Lucida Console";
    ctxM.fillStyle = "black"
    ctxM.fillText(rMarkerNames[i],rMarkerOBJ.tris[i].screenSpace[0] +300,rMarkerOBJ.tris[i].screenSpace[1]+250)
  }
  resolution = resolutionInit
  dist = distInit
  mapActive = false
}
