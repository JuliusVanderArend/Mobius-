
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

  function rotateOBJX{
    for(var i =0; i < triLen; i++){
      tris[i].rotateX(0.02);
    }
  function rotateOBJZ{
    for(var i =0; i < triLen; i++){
      tris[i].rotateX(0.02);
    }
  function rotateOBJY{
    for(var i =0; i < triLen; i++){
      tris[i].rotateX(0.02);
    }
  }
}

      tris[i].rotateX(0.02);
      tris[i].rotateZ(0.02)
      tris[i].rotateY(0.02)