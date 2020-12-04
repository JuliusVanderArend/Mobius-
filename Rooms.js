function bridge(event, object){
  // var exits = [["e","corridor"],["s","lounge"]];
  if (object == "n" ||object == "e"||object == "s"||object == "w"){
    if(object == "w"){
      activeRoom = "corridor1";
      output.innerHTML ="you are in corridor 1";
    }
    else if(object == "s"){
      activeRoom = "lounge";
      output.innerHTML ="you are in the lounge";
    }
    else{
      output.innerHTML = "You cant go that way.";
    }
  }
  if(event == "look"){
    output.innerHTML = "bridge";
  }
}

function lounge(event, object){
  if (object == "n" ||object == "e"||object == "s"||object == "w"){
    if(object == "n"){
      activeRoom = "bridge";
      output.innerHTML ="you are in the bridge";
    }
    else if(object == "e"){
      activeRoom = "kitchen";
      output.innerHTML ="you are in the kitchen";
    }
    else if(object == "s"){
      activeRoom = "sleeping quarters";
      output.innerHTML ="you are in the sleeping quarters";
    }

    
    else{
      output.innerHTML = "You cant go that way.";
    }
  }
  if(event == "look"){
    output.innerHTML = "lounge";
  }
}

function corridor1(event, object){
  if (object == "n" ||object == "e"||object == "s"||object == "w"){
    if(object == "e"){
      activeRoom = "bridge";
      output.innerHTML ="you are in the bridge";
    }
    else{
      output.innerHTML = "You cant go that way.";
    }
  }
  if(event == "look"){
    output.innerHTML = "corridor1";
  }
}

function kitchen(event, object){
  console.log("kitchen");
  if (object == "n" ||object == "e"||object == "s"||object == "w"){
    if(object == "w"){
      activeRoom = "lounge";
      output.innerHTML ="you are in the lounge";
    }
    else{
      output.innerHTML = "You cant go that way.";
    }
  }
  if(event == "look"){
    output.innerHTML = "kitchen";
  }
}

function sleeping_quarters(event, object){
  console.log("quarters")
}












// output.innerHTML = (events[eventType] + " " + iObjects[objectType]);