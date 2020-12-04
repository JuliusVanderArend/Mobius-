var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.font = "20px Arial";
var output = document.getElementById("outText");
var input = document.getElementById("inputText");
var tris = [];
var scaleFactor = 300;
var angle = 0;
var resolution = 3;
var pixSize = 2;
var gloabalOffset = [0,0,0];
var objects =[];
const moveSpeed = 0.4;
var activeRoom = "bridge";