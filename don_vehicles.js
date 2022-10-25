let maxspeed = 50;
let damping = .85;
let moveprob = 0.01;
let minspeed = .1;

function createvehiclesDon() {
    for (let i = 0; i < 50; i++) {
        let vehicle = {
            //position: [Math.random() * window.innerWidth, Math.random() * window.innerHeight],
            position: glMatrix.vec2.fromValues(Math.random() * window.innerWidth, Math.random() * window.innerHeight),
            velocity: glMatrix.vec2.fromValues(0, 0),
            size: 10,
            direction: 0,
            sensor: 0,
            speed: 0,
            shape: 0,
            owner: "Don",
            colour: "",
            history: []
        };
        vehicles.push(vehicle);
    }
}
//createvehiclesDon();

function processDonsvehicles() {
    for (let vehicle of vehicles) {
        if (vehicle.owner == "Don") {
            let vvel = glMatrix.vec2.clone(vehicle.velocity);
            if (glMatrix.vec2.length(vvel) < minspeed) {
                if (Math.random() < moveprob) { // moving slowly - move again?
                    console.log("go");
                    //vvel[0] = (Math.random() - .5) * maxspeed;
                    //vvel[1] = (Math.random() - .5) * maxspeed;
                    glMatrix.vec2.random(vvel);
                    glMatrix.vec2.add(vvel, vvel, glMatrix.vec2.fromValues(-.5,-.5));
                    glMatrix.vec2.scale(vvel, vvel, maxspeed);
                }
            }
            else { // slow down
                vtemp = glMatrix.vec2.create();
                glMatrix.vec2.normalize(vtemp, vvel);
                glMatrix.vec2.scale(vvel, vtemp, glMatrix.vec2.length(vvel) * damping);
            }
            glMatrix.vec2.copy(vehicle.velocity, vvel);
            //vehicle.position[0] += vehicle.velocity[0];
            //vehicle.position[1] += vehicle.velocity[1];
            glMatrix.vec2.add(vehicle.position, vehicle.position, vehicle.velocity);

            // wrap on screen
            if (vehicle.position[0] > window.innerWidth) {
                vehicle.position[0] -= window.innerWidth;
              } else if (vehicle.position[0] < 0) {
                vehicle.position[0] += window.innerWidth;
              }
              if (vehicle.position[1] > window.innerHeight) {
                vehicle.position[1] -= window.innerHeight;
              } else if (vehicle.position[1] < 0) {
                vehicle.position[1] += window.innerHeight;
              }

            // draw vehicle
            ctx.save();
            {
                ctx.translate(vehicle.position[0], vehicle.position[1]);
                ctx.rotate(glMatrix.vec2.angle(vehicle.velocity, glMatrix.vec2.fromValues(1,0)));
                ctx.scale(vehicle.size, vehicle.size);
                ctx.fillStyle = 'rgba(255, 0, 255, 0.1)';
                ctx.fillRect(-0.5, -0.5, 2, 1);
            }
            ctx.restore();
        }
    }
}

