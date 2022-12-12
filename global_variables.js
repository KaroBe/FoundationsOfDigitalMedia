// ~~ Global Variables ~~

const canvas = document.getElementById("mycanvas");
const canvasParent = document.getElementById("content");
const ctx = canvas.getContext("2d");
var bees = document.getElementById("bees");

let vehicles = [];
var simulate = true;

let resize = function(){
  canvas.width = canvasParent.clientWidth;
  canvas.height = canvasParent.clientHeight;
}
window.onresize = resize;
resize();
