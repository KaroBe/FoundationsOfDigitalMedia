
function createvehiclesXiao() {
    for (let i = 0; i < 20; i++) {
        let vehicleX = {
            position: [Math.random() * 500, Math.random() * 500],
            velocity: [Math.random() * 10, Math.random() * 10],
            size: 50,
            direction: 1,
            sensor: 0,
            speed: 0.5,
            shape: 0,
            owner: "Xiao",
            colour: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            history: []
        }
        vehicles.push(vehicleX);
    }
}
createvehiclesXiao();

// collision check with vehicle
function collide(vehicle1, vehicle2) {
    var vehiclePos = vehicle1.position;
    var otherVehiclePos = vehicle2.position;
    var x_collision = (Math.abs(vehiclePos[0] - otherVehiclePos[0]) <= vehicle1.size);
    var y_collision = (Math.abs(vehiclePos[1] - otherVehiclePos[1]) <= vehicle1.size);
    return x_collision && y_collision;
}

function collideWithAny(vehicle) {
    for (const element of vehicles) {
        if ((vehicle.position[0] + vehicle.size >= element.position[0] && vehicle.position[0] <= element.position[0] + element.size) &&
            (vehicle.position[1] + vehicle.size >= element.position[1] && vehicle.position[1] <= element.position[1] + element.size)) {
            bounceX(vehicle)
            bounceX(element)
            bounceY(vehicle)
            bounceY(element)
        }
    }
}

// collision check with canvas border
function canvasBorderCollision(vehicle) {
    if (vehicle.position[0] + vehicle.size >= canvas.clientWidth || vehicle.position[0] < 0) {
        bounceX(vehicle)
    }
    if (vehicle.position[1] + vehicle.size > canvas.clientHeight || vehicle.position[1] < 0) {
        bounceY(vehicle)
    }
}

function destroyVehicle(vehicle) {
    vehicles.splice(vehicles.indexOf(vehicle), 1);
}

function bounceX(vehicle) {
    vehicle.velocity[0] = (-vehicle.velocity[0]);
}
function bounceY(vehicle) {
    vehicle.velocity[1] = (-vehicle.velocity[1]);
}

function processXiao() {
    for (const vehicle of vehicles) {
        if (vehicle.owner != "Xiao") return;
        if (collideWithAny(vehicle)) {
            bounceX(vehicle);
        }

        canvasBorderCollision(vehicle);

        // update velocity and position
        vehicle.position[0] += vehicle.velocity[0] * vehicle.speed;
        vehicle.position[1] += vehicle.velocity[1] * vehicle.speed;

        // render
        ctx.save();
        {
            ctx.fillStyle = vehicle.colour;
            ctx.fillRect(vehicle.position[0], vehicle.position[1], vehicle.size, vehicle.size);
        }
        ctx.restore();
    }
}
