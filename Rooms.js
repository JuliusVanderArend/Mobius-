
 var activeRoom = null;
 

 class Bridge{
   constructor(){
     this.helpText = "Try looking at the body, it might reveal something useful, also that ID might get you into the medbay."
     this.objects = [["id","card"],["body","corpse","man"],["lounge","s","south"],["c1","corridor","west","w"], ["console","consoles","pc","computer"]]
     this.descrip = "you are in the bridge, you spot a body clad in a white lab coat strewn across the floor. An id card lies across a control panel with some consoles nearby."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = bridge
     setSceneMesh(bridgeMesh)
   }

   input(event, object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       else if(object == "id"){
         output.innerHTML = "this is an id card, it may be useful for opening some doors...."
       }
       else if(object == "body"){
         output.innerHTML = "you turn over the body to reveal a pistol grasped in the man’s hand."
         this.objects.push(["pistol","gun","weapon"])
       }
       else if(object == "pistol"){
         output.innerHTML = "it appears to be an older model with 2 rounds left in the magazine, the grip is inscribed 'Weyland-Yutani'."
       }
       else if(object == "console"){
         output.innerHTML = "you power up the console, the screen flickers to life displaying the last entry...."
         clearCTX()
         ctx.font = "16px monospace";
         ctx.fillText("// INITIALIZING..LOADING ROM..CHEKCING PERIFERALS...321...ACTIVATE//",20,20)
         ctx.fillText("//CAPTAINS LOG: status: desperate, food supplies are low....",20,50)
         ctx.fillText("life signs: fading.. we won’t last much longDFSAAAAAAAAA42314HHHH//",20,80)
         ctx.fillText("//END MESSAGE//",20,120)
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "id"){
         if(inventory.includes("id") == false){
          output.innerHTML = "you take the ID card and put it in your pocket."
          inventory.push("id")
          console.log(inventory)
         }
         else{
           output.innerHTML = "you already took the ID-card."
         }
       }
       else if(object == "pistol"){
         if(inventory.includes("pistol") == false){
          output.innerHTML = "you pick up the pistol and put it in your belt."
          inventory.push("pistol")
          console.log(inventory)
         }
         else{
           output.innerHTML = "you already took the pistol."
         }
       }
       else if(object == "body"){
         output.innerHTML = "seriously.... it weighs like 200 pounds, the body isn't going anywhere."
       }
     } 

     if(events[event] == "go"){
       if(object == "lounge"){
         lounge.init()
       }
       else if(object == "c1"){
         c1.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

 class Lounge{
   constructor(){
     this.helpText = "You need to fix the gravity generator to progress, try typing 'fix gravity'."
     this.objects = [["quarters","sleeping","s","south"],["kitchen","e","east"],["airlock","w","west"],["bridge","n","north"],["gfg","gravitational","feild","generator","gravity"],["coffee","cup"]]
     this.descripNullG = "You take your first step into the lounge.....and go flying into the ceiling? it appears the gravitational field generator (GFG) is busted, a cup of coffee hangs limply in the abyss before you. How did this place fall into such disrepair?..... it was fine yesterday...."
     this.descrip = "You are in the Lounge, normally this place is full of crewmembers engaged in various recreational activities, but it is rather dead now... <br><br>the kitchen is east<br><br> the bridge is north<br><br> the airlock is west<br><br> the sleeping quarters are south."
     this.hasGravity = false
     this.launchTrys = 0;
     this.failtexts = ["You launch off of the south wall and majestically drift through the lounge,....before unceremoniously smacking into a wall. It appears you have missed the door.","Once again you launch towards the door, once again you bury your nose in the opposite wall.","You sail into the opposite wall nearly smacking into a deadly looking support girder, some gravity would be really nice right about now...."]
   }
   init(){
     setSceneMesh(loungeMesh)
     if(this.hasGravity == false){
       output.innerHTML = this.descripNullG
     }
     else if(this.hasGravity){
      output.innerHTML = this.descrip
     }
     activeRoom = lounge
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         setSceneMesh(loungeMesh)
         if(this.hasGravity){
           output.innerHTML = this.descrip
         }
         else{
           output.innerHTML = this.descripNullG
         }
         
       }
       else if(object == "gfg"){
         if(this.hasGravity == false){
          output.innerHTML = "Something has eaten through the power conduit that supplies the GFG, it should be a simple fix being the experienced engineer you are."
         }
         else{
           output.innerHTML = "The field generator hums calmly, indifferent to your existence."
         }
       }
       else if(object == "coffee"){
         output.innerHTML = "the coffee floats by, ignoring you completely"
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "coffee"){
         output.innerHTML = "You grab at the coffee but only succeed in getting it all over your shirt."
       }
     }

     if(events[event] == "go"){
       if(object == "quarters"){
         quarters.init()
       }
       else if(object == "kitchen"){
         if(this.hasGravity == false){
           if(this.launchTrys > 2){
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable, you crash into steel reinforcement girder, your neck snaps and you promptly die..."
             death()
           }
           else{
            output.innerHTML = this.failtexts[this.launchTrys]
            this.launchTrys ++
           }
         }
         else{
           kitchen.init()
         }
         
       }
       else if(object == "airlock"){
         if(this.hasGravity == false){
           if(this.launchTrys > 2){
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable, you crash into steel reinforcement girder, your neck snaps and you promptly die..."
             death()
           }
           else{
            output.innerHTML = this.failtexts[this.launchTrys]
            this.launchTrys ++
           }
         }
         else{
           airlock.init()
         }
       }
       else if(object == "bridge"){
         if(this.hasGravity == false){
           if(this.launchTrys > 2){
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable, you crash into steel reinforcement gurder, your neck snaps and you promptly die..."
             death()
           }
           else{
            output.innerHTML = this.failtexts[this.launchTrys]
            this.launchTrys ++
           }
         }
         else{
           bridge.init()
         }
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
     if(events[event] == "fix"){
       if(object == "gfg"){
         output.innerHTML = "With a warm glow and thick electric hum, the field generator comes to life, you feel good to be back on solid ground."
         this.hasGravity = true
       }
     }
   }
   
 }

 
   class Quarters{
   constructor(){
     this.helpText = "Try some basic commands like: 'look magazine' or 'go lounge'"
     this.objects = [["lounge","n","north"],["medbay","w","west"],["mag","magazine","magazines"],["pod","hypersleep","bed"],["ceiling","roof"]]
     this.descrip = "you are in the sleeping quarters, most mornings this place is bustling with sleepy crewmen, but today its empty, dust spills from the ceiling as the ship's hull creaks, this place looks like it's aged 50 years overnight. by the adjacent hyper sleep pod there are some tattered magazines<br><br> the medbay is to your west<br><br> the lounge is north."
     this.magTaken = false
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = quarters
     setSceneMesh(quartersMesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         setSceneMesh(quartersMesh)
         output.innerHTML = this.descrip
       }
       else if(object == "mag" && this.magTaken == false){
         output.innerHTML = "you can just read the date as '2117' before the magazine turns into dust in your hands."
         this.magTaken = true
       }
       else if(object == "mag" && this.magTaken == true){
         output.innerHTML = "the magazine is destroyed, you can no longer read it."
       }
       else if(object == "pod"){
         output.innerHTML = "the pod is constructed of a brushed metal base with a sleeping compartment inside, above the pod there is a petal-shaped glass lid."
       }
       else if(object == "ceiling"){
         output.innerHTML = "spidercracks run across the dilapidated ceiling, the text: 'HELP ME!' is carved into the metal, strange........"
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "mag" && this.magTaken==false){
         output.innerHTML = "as you pick up the magazine, it disintegrates into dust."
         this.magTaken = true
       }
       else if(object == "mag" && this.magTaken==true){
         output.innerHTML = "you grasp at the magazines dust in the air, but it is a futile effort."
       }
     }

     if(events[event] == "go"){
       if(object == "lounge"){
         lounge.init()
       }
       else if(object == "medbay"){
         if(inventory.includes("id")){
           medbay.init()
         }
         else{
           output.innerHTML = "The door is locked, only doctors can access the medbay"
         }
         
       }
       else{
         output.innerHTML = "You can't go that way."
       }
       
     }
   }
 }

    class Coms{
   constructor(){
     this.helpText = "try 'look coms' to see the status of coms or 'use coms' to contact help and win the game"
     this.objects = [["e2","engineering","w","west"],["console","control","pannel","communications","coms"]]
     this.descrip = "you are in communications, hundreds of buttons and switches flash on and off, twinkling like lights on a Christmas tree. In the center of this control pannel there is the main communications console, used for contacting other planets and vessels.<br><br>If you want to escape this ship alive, you will need to contact help. "
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = coms
     setSceneMesh(comsMesh)
   }
   input(event,object){
     console.log(object)
     console.log(events[event])
     if(events[event] == "look"){
       if(object == 111){
         setSceneMesh(comsMesh)
         output.innerHTML = this.descrip
       }
       if(object == "console"){
         output.innerHTML = "In order to use communications, the coms array must be functional and you must have power."
         if(reactorFixed){
           output.innerHTML +="<br><br> REACTOR STATUS: NOMINAL"
         }
         else{
           output.innerHTML +="<br><br> REACTOR STATUS: INSUFFICIENT POWER"
         }
        if (comsDishFixed){
          output.innerHTML +="<br><br> COMS ARRAY STATUS: NOMINAL"
        }
        else{
          output.innerHTML +="<br><br> COMS ARRAY STATUS: NON FUNCTIONAL"
        }
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
     }
 
     if(events[event] == "go"){
       if(object == "e2"){
         e2.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
     if(events[event] == "use"){
       if(object == "console"){
         console.log("FUCKL UYESDFSDF")
         if(reactorFixed && comsDishFixed == false){
           output.innerHTML = "You need to fix the coms array to use communications."
         }
         else if(comsDishFixed && reactorFixed == false){
           output.innerHTML = "You need to fix the reactor to use communications."
         }
         else if(comsDishFixed && reactorFixed){
           win()
         }
         else{
           output.innerHTML = "You need to fix the reactor and the coms array to use communications."
         }
       }
     }
   }
 }

    class Medbay{
   constructor(){
     this.helpText = "good on you for finding your way in here, look at the android and take his suit."
     this.objects = [["quarters","sleeping","e","east"],["c2","corridor","w","west"],["droid","android","robot","body"]]
     this.descrip = "You are in the medbay, this appears to be the only part of the ship protected from decay. The walls still have a bright sterile gleam. Unfortunately this has not done much for the inhabitants of this room...A dead android is slumped over a console. <br><br>the sleeping quarters are east<br><br>the second maintenance corridor is west."
   }
   init(){
     output.innerHTML = "As you palm the doctors ID on the scanner, the door to the medbay slides open."
     output.innerHTML += this.descrip
     activeRoom = medbay
     setSceneMesh(medbayMesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
         setSceneMesh(medbayMesh)
       }
       else if(object == "droid"){
         output.innerHTML = "the android's sallow skin hangs loosely around his dead eyes. poor sod, probably locked himself in the medbay and ran out of power...<br><br>The android is wearing a space suit which appears to be in good condition, this could be useful...."
         this.objects.push(["spacesuit","space","suit"])
       }
       else if(object == "spacesuit"){
         output.innerHTML ="The suit is sleek white in colour and thickly padded<br><br>This should allow you to survive the cold void of space... could be pretty useful"
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "droid"){
         output.innerHTML = "you tug at the androids arm, but it refuses to budge."
       }
       else if(object == "spacesuit" && inventory.includes("spacesuit")==false){
         output.innerHTML = "laboriously, you put on the suit over your engineer's uniform"
         inventory.push("spacesuit")
       }
        else if(object == "spacesuit" && inventory.includes("spacesuit")){
         output.innerHTML = "You are already wearing the spacesuit"
       }
     }

     if(events[event] == "fix"){
       if(inventory.includes("battery")){
         output.innerHTML = "the android springs to life:<br><br>'Hello, I must say, I am terribly thankful for your help!"
         inventory.push("android")
       }
       else{
         output.innerHTML = "you try to fix him, but it's no use, he needs a new battery."
       }
     }

     if(events[event] == "go"){
       if(object == "quarters"){
         quarters.init()
       }
       else if(object == "c2"){
         c2.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

    class C1{
   constructor(){
     this.helpText = "Try looking at the droid with 'look droid'"
     this.objects = [["bridge","e","east"],["airlock","s","south"],["droid","android","robot"," maintenance "],["shoot"],["key"],["attack"],["run"]]
     this.descrip = "you are in 1st maintenance corridor, you spot a deactivated maintenance droid that looks as if it was half way through mending a large alien shaped hole in the wall....<br><br>The bridge is east<br><br>The Airlock is south."
     this.descripDroidDead = "you are in the 1st maintenance corridor... the electronic guts of a disembowelled robot lie before you....<br><br>The bridge is east<br><br>The Airlock is south."
     this.descripDroidAlive = "The maintenance droid is still here, and still very angry."
     this.descripDroidPassified = "you are in the 1st maintenance corridor, the maintenance droid has scuttled away somewhere in the ship.<br><br>The bridge is east<br><br>The Airlock is south."
     this.droidEventTrigger = false
     this.droidDead = false
     this.droidPassified = false
     this.activeObject = null
     this.firstVisit = true
   }
    droidInteraction(){
     console.log(this.activeObject)
    //  console.log(inventory)
     output.innerHTML = "you have woken the maintenance droid from it's deep sleep<br><br>THREAT DETECTED...AUTOMATED DEFENCE PROCEDURE INTITIATED....PROVIDE SYSTEM KEY OR BE DISSASEMBLED IMEDIATLEY!<br><br> Oh dear, the droid appears to still be a bit...startled...<br><br>Your options are...."
     output.innerHTML += "<br><br> Run away (RUN)"
     output.innerHTML += "<br><br> Attack the droid (ATTACK)"
     if(inventory.includes("pistol")){
       output.innerHTML += "<br><br><span style='color: #d13d44'>shoot the droid with your pistol (SHOOT)</span>"
     }
     if(inventory.includes("key")){
       output.innerHTML += "<br><br><span style='color: #9a25b8'>show the droid your system-key (KEY)</span>"
     }
     if(this.activeObject == "run"){
       var rand = Math.random()
       if(rand < 0.45){
         activeRoom = bridge
         output.innerHTML = "you scramble away to the bridge."
       }
       if(rand <= 0.95){
         activeRoom = airlock
         output.innerHTML = "you scramble away to the airlock."
       }
       if(rand > 0.95){
         output.innerHTML = "you flee in terror, but to no avail, the droid eviscerates you with its maintenance claw....."
         death()
       }
     }
     else if(this.activeObject == "attack"){
       var rand = Math.random()
       if(rand < 0.6){
         output.innerHTML = "you charge the droid, clawing at it's metallic dome with your fingernails.... somehow by dumb luck, you manage to snag a signalling Condit with your finger and pull it loose. The droid fizzles and pops before dying for good.<br><br>You spot a reactor cell inside the droid's main compartment and put it in your back pocket... this could be very useful...."
         inventory.push("reactor_cell")
         this.droidEventTrigger = false
         this.droidDead = true
         this.activeObject = null
       }
       else{
         output.innerHTML = "You claw at the droid's metallic dome, but to no effect.... the droid promptly eviscerates you with its maintenance claw."
         death()
       }
     }
     else if(this.activeObject == "shoot"){
       output.innerHTML = "Aiming squarely at the droids processing dome, you pull the trigger... with a tactile click, you blow a large hole through the droids head.<br><br>it fizzles and pops before collapsing into a mess of robot guts.<br><br>You spot a reactor cell inside the droid's main compartment and put it in yout back pocket... this could be very usefull...."
       inventory.push("reactor_cell")
       this.droidEventTrigger = false
       this.droidDead = true
       this.activeObject = null
     }
     else if(this.activeObject == "key"){
       output.innerHTML = "you show the droid the system-key hanging around your neck.<br><br>SYSTEM-KEY DETECTED PLEASE INSERT.<br><br>approaching cautiously you insert the key into the droid's scanning receptacle<br><br>KEY ACCEPTED...HOSTILITY LEVEL.RESET() HOSTILITY LEVEL LOWERING....<br><br> The droid chimes in an eloquent British accent: 'ah, hello there human, how may I help you?...oh, it appears the ship's reactor is fried, I shall get right to fixing it.'<br><br> The reactor is now repaired."
       reactorFixed = true;
       this.droidEventTrigger = false
       this.activeObject = null
       this.droidPassified = true
       this.droidDead = true
     }
   }
   init(){
     setSceneMesh(c1mesh)
     if(this.droidDead == false && this.firstVisit){
       output.innerHTML = this.descrip
       this.firstVisit = false
     }
     else if(this.droidDead == false && this.droidEventTrigger == false && this.droidPassified == false){
       output.innerHTML = this.descripDroidAlive
     }
     else if(this.droidPassified == true){
       output.innerHTML = this.descripDroidPassified
     }
     else{
       output.innerHTML = this.descripDroidDead
     }
     activeRoom = c1
   }
   input(event,object){
     if(this.droidEventTrigger && this.droidDead == false){
      console.log("droid interact")
      this.activeObject = object
      this.droidInteraction()
     }
     else{
      if(events[event] == "look"){
        if(object == 111){
          setSceneMesh(c1mesh)
          if(this.droidDead == false && this.droidEventTrigger == false){
            output.innerHTML = this.descrip
            this.firstVisit = false
          }
          else if(this.droidDead == false && this.firstVisit == false && this.droidPassified == false){
            output.innerHTML = this.descripDroidAlive
          }
          else if(this.droidPassified == true){
            output.innerHTML = this.descripDroidPassified
          }
          else{
            output.innerHTML = this.descripDroidDead
          }
        }
        if(object == "droid" && this.droidDead == false) {
          this.droidEventTrigger = true
          this.droidInteraction()
        }
      }

      if(events[event] == "take"){
        if(object == 111){
          output.innerHTML = "take what?"
        }
      }

      if(events[event] == "go"){
        if(object == "bridge"){
          bridge.init()
        }
        else if(object == "airlock"){
          airlock.init()
        }
        else{
          output.innerHTML = "You can't go that way."
        }
      }
     }
   }
 }

    class C2{
   constructor(){
     this.helpText = "This is an empty room"
     this.objects = [["medbay","e","east"],["e2","engineering","s","south"],["e1","n","north"]]
     this.descrip = "you are in the 2nd maintenance corridor."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = c2
     setSceneMesh(c2Mesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         setSceneMesh(c2Mesh)
         output.innerHTML = this.descrip
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
     }

     if(events[event] == "go"){
      if(object == "medbay"){
         medbay.init()
      }
      else if(object == "e2"){
        e2.init()
      }
      else if(object == "e1"){
        e1.init()
      }
      else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

    class Kitchen{
   constructor(){
     this.helpText = "try typing 'look body'"
     this.objects = [["lounge","w","west"],["body","feet","man","corpse"]]
     this.descrip = "you enter the kitchen, and are greeted by absolute stench. 50 year old space-lasagne doesn’t smell too good apparently. in the corner you see a pair of feet dangling out of a loose maintenance shaft."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = kitchen
     setSceneMesh(kitchenMesh)
   }
   input(event,object){
     console.log(events[event])
     console.log("look")
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
         setSceneMesh(kitchenMesh)
       }
       else if(object == "body"){
         output.innerHTML = "you tug on the pair of feet, and a grubby man wearing engineer's clothes flops to the floor. The mans face is covered in red, moldy lasagna-looking goop, a key inscribed 'maintenance-system-key' is hung around his neck."
         this.objects.push(["key","system"," maintenance "])
         console.log(this.objects)
       }
       if(object == "key"){
         output.innerHTML = "the key is roughly cut and etched with tally marks, you wonder what this means."
      }
     }

     else if(events[event] == "take"){
       console.log("take")
       if(object == 111){
         output.innerHTML =  "take what?"
       }
       else if(object == "key")
       console.log("key")
        if(inventory.includes("key")==false){
          output.innerHTML = "you take the key and place it around your neck."
          inventory.push("key")
        }
        else{
          output.innerHTML = "you already took the key."
        }
     }

     else if(events[event] == "go"){
       console.log("go")
       if(object == "lounge"){
         lounge.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

    class E1{
   constructor(){
     this.helpText ="|This is an empty room."
     this.objects = [["reactor","e","east"],["c2","corridor","s","south"],["airlock","n","north"]]
     this.descrip = "you are in 1st engineering."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = e1
     setSceneMesh(eMesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
          setSceneMesh(eMesh)
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
     }

     if(events[event] == "go"){
       if(object == "reactor"){
         reactor.init()
       }
       else if(object == "c2"){
         c2.init()
       }
       else if(object == "airlock"){
         airlock.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

    class E2{
   constructor(){
     this.helpText = "This is an empty room"
     this.objects = [["c2","corridor","n","north"],["coms","communications","e","east"]]
     this.descrip = "you are in 2nd engineering."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = e2
      setSceneMesh(eMesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
          setSceneMesh(eMesh)
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
     }

     if(events[event] == "go"){
       if(object == "c2"){
         c2.init()
       }
       else if(object == "coms"){
         coms.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }

     }
   }
 }

    class Reactor{
   constructor(){
     this.helpText = "You need a power core to fix the reactor type 'fix reactor' to fix the reactor HINT: look in the first maintenance corridor for the power core."
     this.objects = [["e1","engineering","w","west"],["core","reactor"]]
     this.descrip = "you are in the reactor, the reactor core sputters and flickers dimly as if fighting to stay alive...the power output reads 12 Kw, nowhere near enough to power the comms array.<br><br> The reactor core will need to be fixed in order to contact help.<br><br>First engineering is west."
     this.descripReacFixed = "you are in the reactor, it now appears to be functional, you are comforted by it's warm glow.<br><br>First engineering is west"
   }
   init(){
      if(reactorFixed){
           output.innerHTML = this.descripReacFixed
         }
         else{
            output.innerHTML = this.descrip
         }
     activeRoom = reactor
     setSceneMesh(reactorMesh)
   }
   input(event,object){
     console.log(events[event]+object)
     if(events[event] == "look"){
       if(object == 111){
         setSceneMesh(reactorMesh)
         if(reactorFixed){
           output.innerHTML = this.descripReacFixed
         }
         else{
          output.innerHTML = this.descrip
         }
       }
       if(object == "core"){
         if(reactorFixed){
           output.innerHTML = "You open the maintenance hatch... The reactor core is functioning properly."
         }
         else{
          output.innerHTML = "Upon opening the maintenance hatch, you discover that the reactor is running on fumes!<br><br>There is almost no fuel left...it's like the reactor has been running for decades. It will require a new reactor cell to be functional."
         }
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       if(object == "core"){
         output.innerHTML = "the reactor core is bolted down and refuses to move...it also weighs 20 tons"
       }
     }

     if(events[event] == "go"){
       if(object == "e1"){
         e1.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
     if(events[event] == "fix"){
       if(reactorFixed){
         output.innerHTML = "You already fixed the reactor."
       }
       else{
        if(inventory.includes("reactor_cell")){
          output.innerHTML = "Carefully, you insert the reactor cell into the containment chamber<br><br>The core brightens and begins to hum in a rhythmic manner, power output jumps to 2000 kW, this should be sufficient to use the coms array."
          reactorFixed = true;
        }
        else{
          output.innerHTML = "you tinker with the reactor core, but it is no use, you will not be able to get anywhere near enough power out of it without a replacement reactor cell.<br><br>You must look for a reactor cell."
        }
       }
     }
   }
 }

    class Airlock{
   constructor(){
     this.helpText = "You need to type: 'go airlock' to use the airlock, but you must have a spacesuit HINT: look in the medbay."
     this.objects = [["e1","engineering","s","south"],["c1","corridor","n","north"],["lounge","e","east"],["space","outer","outside","airlock","air","lock"]]
     this.descrip = "you are in the airlock. There is one door leading to the cavernous expanse of space"
     this.exitAttempts = 0
     this.exitAttemptTexts = ["You don’t have a space suit, if you go out there, you wont last more than 30 seconds.","You press your hand to the icy cold glass, the though of going out there unprotected fills you with dread.","This is your last warning....if you go out there YOU WILL DIE!"]
   }
   init(){
     output.innerHTML = this.descrip
     output.innerHTML += " Outside there is nothing but the cold void of space, you think you can see home from here, but its fading, consumed by darkness..."
     activeRoom = airlock
     setSceneMesh(airlockMesh)
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
         setSceneMesh(airlockMesh)
       }
       if(object == "space"){
         output.innerHTML = "you gaze into the darkness of space, it fills you with a cold seeping dread."
       }
       
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
     }

     if(events[event] == "go"){
       if(object == "e1"){
         e1.init()
       }
       else if(object == "c1"){
         c1.init()
       }
       else if(object == "lounge"){
         lounge.init()
       }
       else if(object == "space"){
         if(inventory.includes("spacesuit")){
           output.innerHTML = "Your spacewalk is successful, the communications dish is now functional."
           comsDishFixed = true
         }
         else{
           if(this.exitAttempts < 3){
            output.innerHTML = this.exitAttemptTexts[this.exitAttempts]
            this.exitAttempts ++
           }
           else{
             death()
           }
         }
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
     else if(events[event] == "use"){
       if (object == ""){

       }
     }
   }
 }

function death(){
  output.innerHTML = "you die (reload page to restart)"
  console.log("you die")
  amDead = true;
  
}

function win(){
  output.innerHTML = "YOU WIN, an earling ship picks you up and takes you back to earth... just in time for Christmas."
  console.log("YOU WIN")
}




bridge = new Bridge()
lounge = new Lounge()
quarters = new Quarters()
coms = new Coms()
medbay = new Medbay()
c1 = new C1()
c2 = new C2()
kitchen = new Kitchen()
e1 = new E1()
e2 = new E2()
reactor = new Reactor()
airlock  = new Airlock()

activeRoom = quarters
       

