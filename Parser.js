var cmds = [
  ["get","take","pick","grab","hold","test"],
  ["look","veiw"],
  ["damage","attack","destroy","kill"],
  ["go"]
]

var iObjects = ["apple","chair","lamp","testOBJ","fuel","pipes","n","s","e","w"];
var events = ["take","look","attack","go"];

function takeInput(){
  // console.log(activeRoom);

  var eventType = 111;
  var objectType = 111;
  inp = input.value.trim().toLowerCase().split(" ");
  input.value = "";
  // console.log(inp)
  var foundCMD = false;
  var foundOBJ = false;
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
        else{
          for(var g = 0; g < iObjects.length; g++){
            if (iObjects[g] == inp[f] && foundOBJ == false){
              objectType = g;
              foundOBJ = true;
            }
            // switch(iObjects[g]){
            //   case()
            // }
          }
        }
      }
    }
  }
  switch(activeRoom){
    case("bridge"):
      bridge(events[eventType],iObjects[objectType]);
      break;
    case("lounge"):
      lounge(events[eventType],iObjects[objectType]);
      break;
    case("corridor1"):
      corridor1(events[eventType],iObjects[objectType]);
      break;
    case("kitchen"):
      kitchen(events[eventType],iObjects[objectType]);
      break;
    case("sleeping quarters"):
      sleeping_quarters(events[eventType],iObjects[objectType]);
      break;
  }
  // return([eventType, objectType])
} 