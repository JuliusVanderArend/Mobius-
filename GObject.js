
class GObject{
  constructor(tris){
    this.tris = tris
  }

  renderOBJ(){
    var triLen = this.tris.length
    for(var i =0; i < triLen; i++){
      this.tris[i].offset= gloabalOffset;
      this.tris[i].render();
    }
  }

  rotateOBJX(angle){
    var triLen = this.tris.length    
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateX(angle);
    }
  }
  rotateOBJZ(angle){
    var triLen = this.tris.length
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateZ(angle);
    }
  }
  rotateOBJY(angle){
    var triLen = this.tris.length
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateY(angle);
    }
  }
}
