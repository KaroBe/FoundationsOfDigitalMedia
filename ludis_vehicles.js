function v_add(v1, v2) {
    for (let i = 0; i < v1.length; i++) { 
      v1[i] = v1[i] + v2[i];
    }
    return v1;
  }

  function v_to_degree(v) {
    return Math.atan2(v[0], v[1]);
  }

  function degree_to_v(degree) {
    return [Math.cos(degree), Math.sin(degree)];
  }
  
  function vs_mult(v1, s) {
    for (let i = 0; i < v1.length; i++) { 
      v1[i] = v1[i]*s;
    }
    return v1;
  }
  
  function v_mult(v1, v2) {
    for (let i = 0; i < v1.length; i++) { 
      v1[i] = v1[i]*v2[i];
    }
    return v1;
  }

  function check_colission(o1, o2) {
    var pos1 = o1.position;
    var pos2 = o2.position; 
    var x_collision = (Math.abs(pos1[0] - pos2[0]) <= 2*o1.size/3);
    var y_collision = (Math.abs(pos1[1] - pos2[1]) <= 2*o1.size/3);
    return x_collision && y_collision;
  }

function createvehiclesLudi() {
    for (let i = 0; i < 5; i++) {
      let vehicle = {
        position: [20 + Math.random()*200, 300],
        velocity: [0, 0],
        size: 20,
        direction: Math.random(),
        sensor: 0,
        speed: 1 + Math.random(),
        shape: 0,
        owner: "Ludi",
        colour: "green",
        id: String(i),
        history: []
      };
        vehicles.push(vehicle);
    }
}
createvehiclesLudi();

function processLudisVehicles() {
    for (let vehicle of vehicles) {
      if (vehicle.owner == "Ludi") {
        // Border detection
        if ((vehicle.position[1] > (canvas.height - vehicle.size/2)) | (vehicle.position[1] < vehicle.size/2)) {
            vehicle.direction = -vehicle.direction;
        } else if ((vehicle.position[0] > (canvas.width- vehicle.size/2)) | (vehicle.position[0] < vehicle.size/2)) {
            vehicle.direction = (Math.PI -  vehicle.direction);
        }  
        
        var collission_detected = false;
        for (let other_vehicle of vehicles) {
            if (vehicle.id != other_vehicle.id) {
                collission_detected = check_colission(vehicle, other_vehicle) || collission_detected;
            }
        }

        if (collission_detected) {
            vehicle.colour = "Red";
            vehicle.direction = vehicle.direction + Math.PI/8;
        } else {
            vehicle.colour = "Green";
        }

        // simulation of Vehicle
        let direction_vector = [Math.cos(vehicle.direction), Math.sin(vehicle.direction)];
        vehicle.position = v_add(vehicle.position, vs_mult(direction_vector, vehicle.speed));
        if (vehicle.owner == "Don") {
            // draw vehicle
            ctx.save();
            {
            ctx.translate(vehicle.position[0], vehicle.position[1]);
            ctx.rotate(vehicle.direction);
            ctx.scale(vehicle.size, vehicle.size);
            ctx.fillStyle = "blue";
            ctx.fillRect(-0.5, -0.5, 1, 1);
            }
            ctx.restore();
        } else if (vehicle.owner == "Ludi") {
            // draw vehicle
            ctx.save();
            {
            ctx.translate(vehicle.position[0], vehicle.position[1]);
            ctx.rotate(vehicle.direction);
            ctx.scale(vehicle.size, vehicle.size);
            ctx.fillStyle = vehicle.colour;
            ctx.fillRect(-0.5, -0.5, 1, 1);
            }
            ctx.restore();
        }
        }
    }
}