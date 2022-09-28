// ~~ Global Variables ~~

const canvas = document.getElementById("mycanvas");
const canvasParent = document.getElementById("content");
const ctx = canvas.getContext("2d");

let vehicles = [];

let light = {
  position: [300, 300],
  size: 40
};

let resize = function(){
  canvas.width = canvasParent.clientWidth;
  canvas.height = canvasParent.clientHeight;
}
window.onresize = resize;
resize();

// ~~ Functions ~~

https://stackoverflow.com/questions/33512721/generating-complimentary-hex-color-of-randomly-generated-hex-color-in-js
function getRandomColor() {
  return Math.floor(Math.random() * 0x1000000);
}
function getComplementColor(c) {
  return 0xffffff - c;
}
function getHexColor(c) {
  return '#' + ("000000" + c.toString(16)).substr(-6);
}

function printVehicle(vehicle, index, array){
  console.log(vehicle.position);
}
// Create vehicle
function createKarolinesVehicles(){
  for (let i = 0; i < 5; i++) {
    let vehicle = {
      position: [Math.random()*300 + 50, Math.random()*300 + 50],
      velocity: [0, 0],
      size: 10,
      direction: 0,
      sensor: 1,
      speed: 5,
      shape: 0,
      owner: "Karoline",
      colour: "#6E00FF",
      history: []
    }
    vehicle.setDimensions = function(){
      // For the sensors at 45deg, at (1.5, 1.5)
      vehicle.sensorAngle = Math.PI / 4;
      vehicle.sensorDistance = Math.sqrt(1.5 * 1.5 + 1.5 * 1.5);
    }
    vehicle.setColor = function(){
      vehicle.colour = this.colour 
    }
    vehicle.setDimensions();
    vehicles.push(vehicle);
  };
  console.log(vehicles.length);
  vehicles.forEach(printVehicle);
};
createKarolinesVehicles();

function drawVehicle(v){
  // draw vehicle
  ctx.save();
  {
    ctx.translate(v.position[0], v.position[1]);
    ctx.rotate(v.direction);
    ctx.scale(v.size, v.size);
    ctx.fillStyle = v.colour;
    ctx.fillRect(-0.5, -0.5, 1, 1);
  }
  ctx.restore();
}

function distance(v1,v2){
  console.log(v1.position,v2.position);
  return Math.sqrt(
    Math.pow(v1.position[0]-v2.position[0],2) + 
    Math.pow(v1.position[1]-v2.position[1],2)     );
}
function closestFriend(v){
  let closest = null;
  let dis = Infinity;
  for (let other of vehicles){
    if (v.owner == "Karoline") {
      if (v === other) {
        //console.log("skip");
      }
      else{
        let dis_temp = distance(v, other);
        if (dis_temp < dis){
          closest = other;
          dis = dis_temp;
        }
      }
    }
  }
  return closest;
}

function random_walk(v){
  let closest = closestFriend(v);

  https://maththebeautiful.com/angle-between-points/
  friendDir = Math.atanh(closest.position[1] - v.position[1], closest.position[0] - v.position[0]);
  if (friendDir < 0) {
    friendDir += Math.PI * 2;
  }
  console.log(friendDir);

  v.direction = v.direction + (Math.random() - 0.5) * 2 * (0.5 * Math.PI * 0.2);

  // calculate the velocity vector
  // polar to cartesian conversion
  
  // // v.direction = (0.2 * v.direction) + (0.8 * friendDir);
  // v.direction += friendDir;
  // let friendDis = distance(v,closest);
  // v.speed = v.sensor * (friendDis/100);
  // console.log(friendDis);

  // Update Velocity
  v.velocity[0] = v.speed * Math.cos(v.direction);
  v.velocity[1] = v.speed * Math.sin(v.direction);

  // update position
  let next = v.position;
  next[0] = v.position[0] + v.velocity[0];
  next[1] = v.position[1] += v.velocity[1];

  if( next[0] < 10 || next[0] > canvas.width - 20 || next[1] < 10 || next[1] > canvas.height - 20 ){
    v.direction -= Math.PI;
    v.velocity[0] = v.speed * Math.cos(v.direction);
    v.velocity[1] = v.speed * Math.sin(v.direction);
    next[0] = v.position[0] + v.velocity[0];
    next[1] = v.position[1] += v.velocity[1];
  }
  next[0] = v.position[0];
  next[1] = v.position[1];
}

function processKarolinesVehicles() {
  for (let vehicle of vehicles) {
    if (vehicle.owner == "Karoline") {
      // update vehicle
      random_walk(vehicle);
      // draw vehicle
      drawVehicle(vehicle);
    }
  }
}

function clear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawLight(){
  // ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(light.position[0], light.position[1], light.size, 0, 2 * Math.PI, false);
  var radialGradient = ctx.createRadialGradient(light.position[0], light.position[1], 5, 
    light.position[0], light.position[1], light.size);
  radialGradient.addColorStop(0, "orange");
  radialGradient.addColorStop(0.5,"yellow")
  radialGradient.addColorStop(1, "white");
  ctx.fillStyle = radialGradient;
  ctx.fill();
}

function animate(){
    // Reset canvas and draw pointer
    clear();
    drawLight();

    // Process vehicles
    processKarolinesVehicles();

    // Initiate next frame
    window.requestAnimationFrame(animate);
}
window.animate();

// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// Move light with pointer
canvas.onpointermove = function (event) {
  var pos = getMousePos(canvas, event);
  light.position[0] = pos.x;
  light.position[1] = pos.y;

  // let x1 = event.clientX;
  // let y1 = event.clientY;
  // let btn = event.buttons;
  // light.position[0] = x1;
  // light.position[1] = y1;
};
