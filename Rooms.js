 
 var activeRoom = null;
 
 class Bridge{
   constructor(){
     this.objects = [["id","card"],["body","corpse","man"],["lounge","s","south"],["c1","corridor","west","w"], ["console","consoles","pc","computer"]]
     this.descrip = "you are in the bridge, you spot a body clad in a white labcoat strewn accross the floor. An id card lies across a control pannel with some consoles nearby."
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
         output.innerHTML = "this is an id card, it may be usefull for opening some doors...."
       }
       else if(object == "body"){
         output.innerHTML = "you turn over the body to reveal a pistol grasped in the mans hand."
         this.objects.push(["pistol","gun","weapon"])
       }
       else if(object == "pistol"){
         output.innerHTML = "it apears to be an older model with 2 rounds left in the magazine, the grip is inscribed 'Weyland-Yutani'."
       }
       else if(object == "console"){
         output.innerHTML = "you power up the console, the screen flickers to life displaying the last entry...."
         clearCTX()
         ctx.font = "11px monospace";
         ctx.fillText("// INITIALIZING..LOADING ROM..CHEKCING PERIFERALS...321...ACTIVATE//",10,10)
         ctx.fillText("//CAPTAINS LOG: status: desperate, food suplies are low....",10,30)
         ctx.fillText("life signs: fading.. we wont last much longDFSAAAAAAAAA42314HHHH//",10,50)
         ctx.fillText("//END MESSAGE//",10,70)
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
     this.objects = [["quarters","sleeping","s","south"],["kitchen","e","east"],["airlock","w","west"],["bridge","n","north"],["gfg","gravitational","feild","generator","gravity"],["coffee","cup"]]
     this.descripNullG = "You take your first step into the lounge.....and go flying into the ceiling? it appears the gravitational feild generator (GFG) is busted, a cup of coffee hangs limply in the abbys before you. How did this place fall into such disrepair?..... it was fine yesterday...."
     this.descrip = "You are in the Lounge, normally this place is full of crewmembers engaged in various receational activities, but it is rather dead now... <br><br>the kitchen is east<br><br> the bridge is north<br><br> the airlock is west<br><br> the sleeping quarters are south."
     this.hasGravity = false
     this.launchTrys = 0;
     this.failtexts = ["You launch off of the south wall and majestically drift through the lounge,....before unceremoniously smaking into a wall. It appears you have missed the door.","Once again you lauch twords the door, once again you bury your nose in the opposite wall.","You sail into the opposite wall nearly smaking into a deadly looking support gurdur, some gravity would be really nice right about now...."]
   }
   init(){
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
           output.innerHTML = "The feild generator hums calmly, indifferent to your existance."
         }
       }
       else if(object == "coffee"){
         output.innerHTML = "the coffee floats by, ignoring you completly"
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
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable,you crash into steel reinforcement gurder, your neck snaps and you promptly die..."
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
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable,you crash into steel reinforcement gurder, your neck snaps and you promptly die..."
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
             output.innerHTML = "It seems your previous attempts have not made the wall any more permeable,you crash into steel reinforcement gurder, your neck snaps and you promptly die..."
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
         output.innerHTML = "With a warm glow and thick electric hum, the feild generator comes to life, you feel good to be back on solid ground."
         this.hasGravity = true
       }
     }
   }
   
 }

 
   class Quarters{
   constructor(){
     this.objects = [["lounge","n","north"],["medbay","w","west"],["mag","magazine","magazines"],["pod","hypersleep","bed"],["ceiling","roof"]]
     this.descrip = "you are in the sleeping quarters, most mornings this place is bustling with sleepy crewmen, but today its empty, dust spills from the ceiling as the the ship's hull creaks, this place looks like it's aged 50 years overnight. by the adjacent hypersleep pod there are some tattered magazines<br><br> the medbay is to your east<br><br> the lounge is north."
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
         output.innerHTML = "spidercracks run accross the delapidated ceiling, the text: 'HELP ME!' is carved into the metal, strange........"
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "mag" && this.magTaken==false){
         output.innerHTML = "as you pick up the magazine, it disintigrates into dust."
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
     this.objects = [["e2","engineering","w","west"]]
     this.descrip = "you are in communications."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = coms
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
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
   }
 }

    class Medbay{
   constructor(){
     this.objects = [["quarters","sleeping","e","east"],["c2","corridor","w","west"],["droid","android","robot","body"]]
     this.descrip = "You are in the medbay, this appears to be the only part of the ship protected from decay. The walls still have a bright sterile gleam. Unfourtunatley this has not done much for the inhabitants of this room...A dead android is slumped over a console. <br><br>the sleeping quarters are east<br><br>the second maintinace corridor is west."
   }
   init(){
     output.innerHTML = "As you palm the doctors ID on the scanner, the door to the medbay slides open."
     output.innerHTML += this.descrip
     activeRoom = medbay
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       else if(object == "droid"){
         output.innerHTML = "the android's sallow skin hangs loosly around his dead eyes. poor sod, probably locked himself in the medbay an ran out of power...<br><br>The android is wearing a space suit which appears to be in good condition, this could be usefull...."
         this.objects.push(["spacesuit","space","suit"])
       }
       else if(object == "spacesuit"){
         output.innerHTML ="The suit is sleek white in colour and thickly padded<br><br>This should allow you to survive the cold void of space... could be pretty usefull"
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
       }
       else if(object == "droid"){
         output.innerHTML = "you tug at the androids arm, but it reffuses to budge."
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
         output.innerHTML = "the android springs to life:<br><br>'Hello, I must say, I am terribly thankfull for your help!"
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
     this.objects = [["bridge","e","east"],["airlock","s","south"],["droid","android","robot","maintinace"]]
     this.descrip = "you are in 1st maintinace corridor, you spot a deactivated maintinace droid that looks as if it was half way through mending a large alien shaped hole in the wall....<br><br>The bridge is east<br><br>The Airlock is south."
     this.droidEventTrigger = false
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = c1
     setSceneMesh(corridor1Mesh)
   }
   input(event,object){
     
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       if(object == "droid") {
         
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
   droidInteraction(){

   }
 }

    class C2{
   constructor(){
     this.objects = [["medbay","e","east"],["e2","engineering","s","south"],["e1","n","north"]]
     this.descrip = "you are in the 2nd maintinace corridor."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = c2
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
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
     this.objects = [["lounge","w","west"],["body","feet","man","corpse"]]
     this.descrip = "you enter the kitchen, and are greeted by absolute stench. 50 year old space-lasagna dosent smell too good aparently. in the corner you see a pair of feet dangling out of a loose mantinace shaft."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = kitchen
   }
   input(event,object){
     console.log(events[event])
     console.log("look")
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       else if(object == "body"){
         output.innerHTML = "you tug on the pair of feet, and a grubby man wearing engineer's clothes flops to the floor. The mans face is covered in red, moldy lasagna-looking goop, a key inscribed 'robot controller-9000' is hung around his neck."
         this.objects.push(["key","robot","controller","9000"])
         console.log(this.objects)
       }
       else if(object == "key"){
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
     this.objects = [["reactor","e","east"],["c2","corridor","s","south"],["airlock","n","north"]]
     this.descrip = "you are in 1st engineering."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = e1
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
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
     this.objects = [["c2","corridor","n","north"],["coms","communications","e","east"]]
     this.descrip = "you are in 2nd engineering."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = e2
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
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
     this.objects = [["e1","engineering","w","west"]]
     this.descrip = "you are in the reactor."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = reactor
   }
   input(event,object){
     console.log(events[event]+object)
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
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
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

    class Airlock{
   constructor(){
     this.objects = [["e1","engineering","s","south"],["c1","corridor","n","north"],["lounge","e","east"],["space","outer","outside","airlock","air","lock"]]
     this.descrip = "you are in the airlock. There is one door leading to the cavernous expanse of space"
     this.exitAttempts = 0
     this.exitAttemptTexts = ["You dont have a space suit, if you go out there, you wont last more than 30 seconds.","You press your hand to the icy cold glass, the though of going out there unprotected fills you with dread.","This is your last warning....if you go out there YOU WILL DIE!"]
   }
   init(){
     output.innerHTML = this.descrip
     output.innerHTML += "Outside there is nothing but the cold void of space, you think you can see home from here, but its fading, consumed by darkness..."
     activeRoom = airlock
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
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
           output.innerHTML = "Your spacewalk is succesfull, the communications dish is now functional."
           comsDishFixed = true
         }
         else{
          //  console.log("test")
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
   }
 }

function death(){
  output.innerHTML = "you die"
  console.log("you die")
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

activeRoom = airlock
output.innerHTML = "You hear a shrill bepping as you drag yourself out of your hypersleep chamber, it is odly quiet today....."         