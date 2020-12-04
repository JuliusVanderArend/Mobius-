 
 var activeRoom = null;
 
 class Bridge{
   constructor(){
     this.objects = [["id","card"],["body","corpse","man"],["lounge","s","south"],["c1","corridor","west","w"]]
     this.descrip = "you are in the bridge, you spot a body hunched over a controll pannel."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = bridge
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
         output.innerHTML = "you turn over the body to revel a pistol grasped in the mans hand."
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
     }
   }
 }

 class Lounge{
   constructor(){
     this.objects = [["quarters","sleeping","s","south"],["kitchen","e","east"],["airlock","w","west"],["bridge","n","north"]]
     this.descrip = "you are in the lounge."
   }
   init(){
     output.innerHTML = this.descrip
     activeRoom = lounge
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
       else if(object == "kitchen"){
         kitchen.init()
       }
       else if(object == "airlock"){
         airlock.init()
       }
       else if(object == "bridge"){
         bridge.init()
       }
     }
   }
 }

 
   class Quarters{
   constructor(){
     this.objects = [["lounge","n","north"],["medbay","w","west"]]
     this.descrip = "you are in the sleeping quarters."
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
       else if(object == "medbay"){
         medbay.init()
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
     }
   }
 }

    class Medbay{
   constructor(){
     this.objects = [["quarters","sleeping","e","east"],["c2","corridor","e","east"]]
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
     }
   }
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

activeRoom = bridge