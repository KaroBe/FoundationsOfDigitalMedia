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
      colour: "Black",
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

function processAlexVehicles() {
  for (let vehicle of vehicles) {
    if (vehicle.owner == "Alex") {
      // draw vehicle
      ctx.save();
      {
		  
	function claimVehicle() {
		for (let other_vehicle of vehicles) {
            if (vehicle.id != other_vehicle.id) {
                AlexTarget.position = other_vehicle.position;
				var collided = false;
				collided = collide(vehicle, other_vehicle) || collided;
				if (collided) {
					other_vehicle.owner = "Alex";
					collided = true;
				} else {
					return;
				}
            }
        }
	}
	
	claimVehicle();
	
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
        ctx.fillStyle = "Black";
        ctx.fillRect(-0.5, -0.5, 1, 1);
      }
      ctx.restore();
    }
  }
  
function collide(vehicle, other_vehicle) {
    var vehiclePos = vehicle.position;
    var otherVehiclePos = other_vehicle.position; 
    var x_collision = (Math.abs(vehiclePos[0] - otherVehiclePos[0]) <= vehicle.size);
    var y_collision = (Math.abs(vehiclePos[1] - otherVehiclePos[1]) <= vehicle.size);
    return x_collision && y_collision;
  }
}
