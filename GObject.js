
class GObject{
  constructor(tris){
    this.tris = tris
  }

  function renderOBJ{
    triLen = tris.length
    for(var i =0; i < triLen; i++){
      tris[i].offset= gloabalOffset;
      tris[i].render();
    }

  function rotateOBJX(angle){
    for(var i =0; i < triLen; i++){
      tris[i].rotateX(angle);
    }
  function rotateOBJZ(angle){
    for(var i =0; i < triLen; i++){
      tris[i].rotateZ(angle);
    }
  function rotateOBJY(angle){
    for(var i =0; i < triLen; i++){
      tris[i].rotateY(angle);
    }
  }
}
