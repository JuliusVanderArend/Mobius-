var cmds = [
  ["get","take","pick","grab","hold","test"]
]

function takeInput(){
  inp = input.value.trim().toLowerCase().split(" ");
  // console.log(inp)
  for(var i = 0; i < cmds.length; i++){
    for(var j = 0; j < cmds[i].length; j++){
      var nMatchedCommands = 0//keeping track of number of matched commands so not more that one action is performed
      for(var f = 0; f < inp.length; f++){
        console.log(inp[f]);
        if (cmds[i][j] == inp[f]){
          if(nMatchedCommands < 1){
            console.log("matched")
            output.innerHTML = "item taken"
            nMatchedCommands ++;
          }
          if(nMatchedCommands >0){
            output.innerHTML = "im confused I cant do multiple things at once"
          }
        }
      }
    }
  }
}