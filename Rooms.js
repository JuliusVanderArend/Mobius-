function room1(event, object){
  console.log(object)
  var rObjects = ["fuel canister","pipes"];
  if(events[event] == "look"){
    if(object == 111){
      output.innerHTML = "you are standing in a musty maintinace shaft, water drips from broken pipes and a flickering light shines. You can see some rusty fuel canisters strewn about."
    }
    if(iObjects[object] == "pipes"){
      output.innerHTML = "The pipes appear to be fuel lines, they are full of cracks and leaking fuel"
    }
    if(iObjects[object] == "fuel"){
      output.innerHTML = "they canisters look worn, but they still have some fuel in them"
    }
  }
  
}

// output.innerHTML = (events[eventType] + " " + iObjects[objectType]);