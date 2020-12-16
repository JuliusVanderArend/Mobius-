
class GObject{
  constructor(tris, position){
    this.tris = tris;
    this.pos = position;
  }

  renderOBJ(){
    var triLen = this.tris.length;
    for(var i =0; i < triLen; i++){
      this.tris[i].offset= vAdd(gloabalOffset, this.pos);
      this.tris[i].render();12
    }
  }

  rotateOBJX(angle){
    var triLen = this.tris.length;
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateX(angle);
    }
  }
  rotateOBJZ(angle){
    var triLen = this.tris.length;
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateZ(angle);
    }
  }
  rotateOBJY(angle){
    var triLen = this.tris.length;
    for(var i =0; i < triLen; i++){
      this.tris[i].rotateY(angle);
    }
  }
}
