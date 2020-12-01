class Tri{
  constructor(v1,v2,v3,){
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v1Init = v1;
    this.v2Init = v2;
    this.v3Init = v3;
    this.offset = [0,0,0];
    this.v01 = v1;
    this.v02 = v2;
    this.v03 = v3;
  }

  render(){
    console.log("rendering" + this.v1)
    var pPoints = [];
    this.v01 = madd(this.v1,this.offset);
    this.v02 = madd(this.v2,this.offset);
    this.v03 = madd(this.v3,this.offset);
    pPoints.push(projectPoint(this.v01)); 
    pPoints.push(projectPoint(this.v02));
    pPoints.push(projectPoint(this.v03)); 
    // console.log(pPoints);
    var p0 = [pPoints[0][0]*scaleFactor/resolution,pPoints[0][1]*scaleFactor/resolution]
    var p1 = [pPoints[1][0]*scaleFactor/resolution,pPoints[1][1]*scaleFactor/resolution]
    var p2 = [pPoints[2][0]*scaleFactor/resolution,pPoints[2][1]*scaleFactor/resolution]
    var points =  drawLine(p0,p1);
    for(var i = 0; i < (points.length); i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }
    points =  drawLine(p1,p2);
    for(var i = 0; i < points.length; i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }
    points =  drawLine(p2,p0);
    for(var i = 0; i < points.length; i++){
      drawPix(pixSize,points[i][0]*resolution+500,points[i][1]*resolution+ 250);
    }

    for (var i = 0; i < pPoints.length; i++){
      drawPix(70 * pPoints[i][2],pPoints[i][0]*scaleFactor+500,pPoints[i][1]*scaleFactor+ 250);
    }
  }

  rotateZ(angle){
    var rotMatrix = [
    [[Math.cos(angle)],[-Math.sin(angle)],[0]],
    [[Math.sin(angle)],[Math.cos(angle)],[0]],
    [[0],[0],[1]]]

    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }

  rotateY(angle){
    var rotMatrix = [
    [[Math.cos(angle)],[0],[Math.sin(angle)]],
    [[0],[1],[0]],
    [[-Math.sin(angle)],[0],[Math.cos(angle)]]
    ]
    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }

   rotateX(angle){
    var rotMatrix = [
    [[1],[0],[0]],
    [[0],[Math.cos(angle)],[-Math.sin(angle)]],
    [[0],[Math.sin(angle)],[Math.cos(angle)]]
    ]
    this.v1 = mmultiply(rotMatrix, this.v1)
    this.v2 = mmultiply(rotMatrix, this.v2)
    this.v3 = mmultiply(rotMatrix, this.v3)
  }
}
