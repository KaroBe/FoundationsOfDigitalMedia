function createvehiclesCindy() {
    let vehicleCindy = {
        position: [200, 200],
        velocity: [2, 2],
        size: 50,
        direction: 0,
        sensor: 0,
        speed: 5,
        shape: 0,
        owner: "Cindy",
        colour: "purple",
        history: []
      }
      vehicles.push(vehicleCindy)
    }
  createvehiclesCindy();
  
  function processCindysvehicles() {
    for (let vehicle of vehicles) {
      if (vehicle.owner == "Cindy") {
        if (vehicle.position[1] <= 0) {
          vehicle.velocity[1] = vehicle.velocity[1] * -1;
          vehicle.direction = vehicle.direction * -1;
        } else if (vehicle.position[0] <= 0) {
          vehicle.velocity[0] = vehicle.velocity[0] * -1;
          vehicle.direction = vehicle.direction - 180;
        } else if (vehicle.position[0] >= canvas.width) {
          vehicle.velocity[0] = vehicle.velocity[0] * -1;
          vehicle.direction = vehicle.direction + 180;
        } else if (vehicle.position[1] >= canvas.height) {
          vehicle.velocity[1] = vehicle.velocity[1] * -1;
          vehicle.direction = vehicle.direction * -1;
        }
  
        /*for (let othervehicle of vehicles) {
          if (vehicle.owner != "Cindy") {
            if (
              vehicle.position[0] >= othervehicle.position[0] - 10 &&
              vehicle.position[0] <= othervehicle.position[0] + 10 &&
              vehicle.position[1] >= othervehicle.position[1] - 10 &&
              vehicle.position[1] <= othervehicle.position[1] + 10
            ) {
              vehicle.velocity[1] = vehicle.velocity[1] * -1;
              vehicle.direction = vehicle.direction * -1;
            }
          }
        }*/
  
        //if (vehicle.owner != "Cindy") {
        //collision();
        //}
        //console.log("a");
        vehicle.position[0] += vehicle.velocity[0];
        vehicle.position[1] += vehicle.velocity[1];
  
        ctx.save();
        {
          ctx.translate(vehicle.position[0], vehicle.position[1]);
          ctx.rotate(vehicle.direction);
          ctx.scale(vehicle.size, vehicle.size);
          ctx.fillStyle = "purple";
          ctx.fillRect(-0.5, -0.5, 1, 1);
        }
        ctx.restore();
      }
    }
  }
  