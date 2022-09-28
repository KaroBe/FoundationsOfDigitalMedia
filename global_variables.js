// ~~ Global Variables ~~

const canvas = document.getElementById("mycanvas");
const canvasParent = document.getElementById("content");
const ctx = canvas.getContext("2d");

let vehicles = [];

let resize = function(){
  canvas.width = canvasParent.clientWidth;
  canvas.height = canvasParent.clientHeight;
}
window.onresize = resize;
resize();
