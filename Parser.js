var cmds = [
  ["get","take","pick","grab","hold","test"],
  ["look","veiw","exam","examine"],
  ["damage","attack","destroy","kill"],
  ["go"],
  ["fix","repair","mend"]
]

var alienTexts = ["<br><br>.....you hear a rumbling deep within the hull of this ship.. what could it be?","<br><br>.....An alein, metalic screach echoes through the room.","<br><br>You here a blunt thump from somewhere in the ship.... must just be your imagination."]

var moveVerbs = ["n","e","s","w","north","east","south","west","lounge","medbay"];
// var iObjects = ["apple","chair","lamp","testOBJ","fuel","pipes","n","s","e","w"];
var events = ["take","look","attack","go","fix"];

function takeInput(){
  console.log(activeRoom);
  movesTaken ++;
  console.log(movesTaken)
  var eventType = 111;
  var parsedObject = 111;
  inp = input.value.trim().toLowerCase().split(" ");
  input.value = "";
  console.log(inp)
  var foundCMD = false;
  var foundOBJ = false;
  for(var z = 0; z < inp.length; z++){
    if(moveVerbs.includes(inp[z])){
      eventType = 3;
      foundCMD == true;
    }
    else if(inp[z] == "help"){
      output.innerHTML = "The objects in this room are:<br><br> "+activeRoom.objects+"<br><br>. The comands you can perform are: "+ cmds
    }
  }
  for(var i = 0; i < cmds.length; i++){
    for(var j = 0; j < cmds[i].length; j++){
      for(var f = 0; f < inp.length; f++){
        if (cmds[0][j] == inp[f] && foundCMD ==false){
          eventType = 0;
          foundCMD = true;
        }
        if (cmds[1][j] == inp[f] && foundCMD ==false){
          eventType = 1;
          foundCMD = true;
        }
        if (cmds[2][j] == inp[f] && foundCMD ==false){
          eventType = 2;
          foundCMD = true;
        }
        if (cmds[3][j] == inp[f] && foundCMD ==false){
          eventType = 3;
          foundCMD = true;
        }
        if (cmds[4][j] == inp[f] && foundCMD ==false){
          eventType = 4;
          foundCMD = true;
        }
        else{
          for(var g = 0; g < activeRoom.objects.length; g++){
            for(var h = 0; h <activeRoom.objects[g].length; h++){
              if (activeRoom.objects[g][h] == inp[f] && foundOBJ == false){
                parsedObject = activeRoom.objects[g][0] ;
                foundOBJ = true;
              }
            }
          }
        }
      }
    }
  }
  activeRoom.input(eventType, parsedObject);
  if(Math.random() < (movesTaken/200)+0.2){
    output.innerHTML += alienTexts[Math.floor(Math.random() * alienTexts.length)];
  }
}    