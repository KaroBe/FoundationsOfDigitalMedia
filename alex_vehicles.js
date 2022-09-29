function createVehicleAlex() {
  for (let i = 0; i < 5; i++) {
    let vehicle = {
      position: [250, 250],
      velocity: [0, 0],
      size: 25,
      direction: 0,
      sensor: 0,
      speed: 0,
      shape: 0,
      owner: "Alex",
      colour: "Red",
      history: []
    };
   vehicles.push(vehicle);
  }
}
createVehicleAlex();

// set up chase source
let AlexTarget = {
  position: [300, 300],
  size: 20
};

function processAlexVehicle() {
  for (let vehicle of vehicles) {
    if (vehicle.owner == "Alex") {
      // draw vehicle
      ctx.save();
      {
 
 // modified version of this codepen https://codepen.io/donwalsin/pen/rNvWqKR
 
    let vcentTosensdist = Math.sqrt(1.5 * 1.5 + 1.5 * 1.5);
    let vcentTosensangle = Math.PI / 4;

    let sensLpos = [
      vehicle.position[0] +
        vehicle.size *
          vcentTosensdist *
          Math.cos(vcentTosensangle + vehicle.direction),
      vehicle.position[1] +
        vehicle.size *
          vcentTosensdist *
          Math.sin(vcentTosensangle + vehicle.direction)
    ];
    let sensRpos = [
      vehicle.position[0] +
        vehicle.size *
          vcentTosensdist *
          Math.cos(-vcentTosensangle + vehicle.direction),
      vehicle.position[1] +
        vehicle.size *
          vcentTosensdist *
          Math.sin(-vcentTosensangle + vehicle.direction)
    ];

    let relposSL = [
      AlexTarget.position[0] - sensLpos[0],
      AlexTarget.position[1] - sensLpos[1]
    ];

    let relposSR = [
      AlexTarget.position[0] - sensRpos[0],
      AlexTarget.position[1] - sensRpos[1]
    ];

    let distLsens = Math.sqrt(
      relposSL[0] * relposSL[0] + relposSL[1] * relposSL[1]
    );
    let distRsens = Math.sqrt(
      relposSR[0] * relposSR[0] + relposSR[1] * relposSR[1]
    );
    let distdiff = distLsens - distRsens;
    console.log(distLsens, distRsens, distdiff);

    // speed
    vehicle.sensor = Math.exp(-(distLsens + distRsens) / 2 / 100);
    vehicle.speed = 2;

    vehicle.direction += ((-distdiff / 100)) / 3;

    // calculate the velocity vector
    // polar to cartesian conversion
    vehicle.velocity[0] = vehicle.speed * Math.cos(vehicle.direction);
    vehicle.velocity[1] = vehicle.speed * Math.sin(vehicle.direction);

    // update position
    vehicle.position[0] += vehicle.velocity[0];
    vehicle.position[1] += vehicle.velocity[1];
 //
        ctx.translate(vehicle.position[0], vehicle.position[1]);
        ctx.rotate(vehicle.direction);
        ctx.scale(vehicle.size, vehicle.size);
        ctx.fillStyle = "Red";
        ctx.fillRect(-0.5, -0.5, 1, 1);
      }
      ctx.restore();
    }
  }
}

canvas.onpointermove = function (event) {
  
  // REPLACE THIS POSITION WITH ANOTHER MACHINE
  
  let x1 = event.clientX;
  let y1 = event.clientY;

  AlexTarget.position[0] = x1;
  AlexTarget.position[1] = y1;
  
  };
