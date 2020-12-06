 
 var activeRoom = null;
 
 class Bridge{
   constructor(){
     this.objects = [["id","card"],["body","corpse","man"],["lounge","s","south"],["c1","corridor","west","w"]]
     this.descrip = "you are in the bridge, you spot a body clad in a white labcoat strewn accross the floor. An id card lies nearby."
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
     this.objects = [["quarters","sleeping","s","south"],["kitchen","e","east"],["airlock","w","west"],["bridge","n","north"],["gfg","gravitational","feild","generator","gravity"]]
     this.descripNullG = "You take your first step into the lounge.....and go flying into the ceiling? it appears the gravitational feild generator (GFG) is busted, a cup of coffe hangs limply in the abbys before you. How did this place fall into such disrepair?..... it was fine yesterday...."
     this.descrip = ""
     this.hasGravity = false
     this.launchTrys = 0;
     this.failtexts = ["You launch off of the south wall and majestically drift through the lounge,....before unceremoniously smaking into a wall. It appears you have missed the door.","Once again you lauch twords the door, once again you bury your nose in the opposite wall.","You sail into the opposite wall nearly smaking into a deadly looking support gurdur, some gravity would be really nice right about now...."]
   }
   init(){
     if(this.hasGravity == false){
       output.innerHTML = this.descripNullG
     }
     else{
      output.innerHTML = this.descrip
     }
     activeRoom = lounge
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       if(object == "gfg"){
         if(this.hasGravity == false){
          output.innerHTML = "Something has eaten through the power conduit that supplies the GFG, it should be a simple fix being the experienced engineer you are."
         }
         else{
           output.innerHTML = "The feild generator hums calmly, indifferent to your existance."
         }
       }
     }

     if(events[event] == "take"){
       if(object == 111){
         output.innerHTML = "take what?"
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
     this.objects = [["lounge","n","north"],["medbay","w","west"],["mag","magazine","magazines"]]
     this.descrip = "you are in the sleeping quarters, most mornings this place is bustling with sleepy crewmen, but today its empty, dust spills from the ceiling as the the ship's hull creaks, this place looks like it's aged 50 years overnight. by the adjacent hypersleep pod there are some tattered magazines, the medbay is to your east, the lounge is north."
     this.magTaken = false
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = quarters
   }
   input(event,object){
     if(events[event] == "look"){
       if(object == 111){
         output.innerHTML = this.descrip
       }
       else if(object == "mag" && this.magTaken == false){
         output.innerHTML = "you can just read the date as '2117' before the magazine turns into dust in your hands."
         this.magTaken = true
       }
       else if(object == "mag" && this.magTaken == true){
         output.innerHTML = "the magazine is destroyed, you can no longer read it."
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
     this.objects = [["quarters","sleeping","e","east"],["c2","corridor","w","west"]]
     this.descrip = "you are in the medbay."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = medbay
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
     this.objects = [["bridge","e","east"],["airlock","s","south"]]
     this.descrip = "you are in 1st maintinace corridor."
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
     this.objects = [["lounge","w","west"]]
     this.descrip = "you are in the kitchen."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = kitchen
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
     console.log("dfsfsfsfsf")
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
     this.objects = [["e1","engineering","s","south"],["c1","corridor","n","north"],["lounge","e","east"]]
     this.descrip = "you are in the airlock."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = airlock
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
       if(object == "e1"){
         e1.init()
       }
       else if(object == "c1"){
         c1.init()
       }
       else if(object == "lounge"){
         lounge.init()
       }
       else{
         output.innerHTML = "You can't go that way."
       }
     }
   }
 }

function death(){
  // output.innerHTML = "you die"
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
output.innerHTML = "You hear a shrill bepping as you drag yourself out of your hypersleep chamber, it is odly quiet today....."