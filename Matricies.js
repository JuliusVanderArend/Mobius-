mmultiply = function (arrA, arrB) {
  // console.log(arrA)
  // console.log("")
  // console.log(arrB)
  if (arrA[0].length !== arrB.length) {
    throw new Error("Matrix mismatch");
  }

  var result = new Array(arrA.length);

  for (var x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length);
  }
  // console.log(arrB)
  // console.log("")
  // console.log(arrB_T)
  var arrB_T = mtranspose(arrB);
  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
      result[i][j] = mdotproduct(arrA[i], arrB_T[j]);
    }
  }
  return result;
};

mdotproduct = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vector mismatch");
  }

  var result = 0;
  for (var i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i];
  }
  return result;
};
mtranspose = function (arr) {
  var result = new Array(arr[0].length);

  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);

    for (var j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
};

function madd(){
      var arrays= arguments, results= [], 
      count= arrays[0].length, L= arrays.length, 
      sum, next= 0, i;
      while(next<count){
          sum= 0, i= 0;
          while(i<L){
              sum+= Number(arrays[i++][next]);
          }
          results[next++]= [sum];
      }
      return results;
    }


var rotateZ = function(point,angle){
  rotMatrix = [
    [[Math.cos(angle)],[-Math.sin(angle)],[0]],
    [[Math.sin(angle)],[Math.cos(angle)],[0]],
    [[0],[0],[1]]
  ]
  // console.log(rotMatrix)
  return mmultiply(rotMatrix, point)
}

var rotateX = function(point,angle){
  rotMatrix = [
    [1,0,0]
    [0,Math.cos(angle),-Math.sin(angle)],
    [0,Math.sin(angle),Math.cos(angle)]
  ]
  // console.log(rotMatrix)
  return mmultiply(rotMatrix, point)
}

var projectPoint = function(point){

  var n = (dist - point[2]).clamp(dist-3.8,1000);
  var z = (1/n)
  var projectionMatrix = [[z,0,0],[0,z,0],[0,0,0]]
  var out  = mmultiply(projectionMatrix,point)
  return[out[0][0],out[1][0],z]
}