function createvehiclesCindy() {
    let vehicleCindy = {
        position: [Math.random() * 500, Math.random() * 200],
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
            let positions = vehicles.filter(function(not) {return not.owner !== "Cindy"})
            let vcentTosensdist = Math.sqrt(1.5 * 1.5 + 1.5 * 1.5);
            let vcentTosensangle = Math.PI / 4;
            //borrowed & modified code from https://codepen.io/donwalsin/pen/rNvWqKR
            for (i = 0; i < positions.length; i++) {
                positions[i].distance = positions[i].position[1] - vehicle.position[1] * vcentTosensdist *
                  Math.cos(vcentTosensangle),
                  positions[i].position[0] - vehicle.position[0] + vcentTosensdist *
                  Math.sin(vcentTosensangle)
        }

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
  

        vehicle.position[0] += vehicle.velocity[0];
        vehicle.position[1] += vehicle.velocity[1];
  
        ctx.save(); {
          ctx.translate(vehicle.position[0], vehicle.position[1]);
          ctx.rotate(vehicle.direction);
          ctx.scale(vehicle.size, vehicle.size);
          ctx.fillStyle = "purple";
          ctx.fillRect(-0.5, -0.5, 1, 1);
        }
        ctx.restore();
        positions.forEach((not) => {
            if(not.distance <= 50){
                vehicle.position[0] = Math.random() * 500;
                vehicle.position[1] = Math.random() * 200;
            }
        })
      }
    }
}