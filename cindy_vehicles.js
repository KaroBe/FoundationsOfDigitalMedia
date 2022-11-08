let vroom = 1;
let that = true;
var randomizer;
//var functions = [runAround, stop];
var colour_list = ["red", "blue", "green", "orange", "black", "purple", "skyblue"];
//let poot = new Audio("fart.mp3");
//let whoosh = new Audio("whoosh.mp3");

function createvehiclesCindy() {
  for (let i = 0; i < vroom; i++) {
    let vehicleCindy = {
      position: [Math.random() * window.innerWidth, Math.random() * window.innerHeight],
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
}
createvehiclesCindy();

function processCindysvehicles() {
  for (let vehicle of vehicles) {
    if (vehicle.owner == "Cindy") {
      let positions = vehicles.filter(function (not) { return not.owner !== "Cindy" })
      //let vcentTosensdist = Math.sqrt(1.5 * 1.5 + 1.5 * 1.5);
      //let vcentTosensangle = Math.PI / 4;
      //borrowed & modified code from https://codepen.io/donwalsin/pen/rNvWqKR
      for (i = 0; i < positions.length; i++) {
        positions[i].distance = (Math.sqrt((Math.abs(positions[i].position[0] - vehicle.position[0]) ** 2) + (Math.abs(positions[i].position[1] - vehicle.position[1]) ** 2)));
      }
      runAround(vehicle);

      ctx.save(); {
        ctx.translate(vehicle.position[0], vehicle.position[1]);
        ctx.rotate(vehicle.direction);
        ctx.scale(vehicle.size, vehicle.size);
        ctx.fillStyle = vehicle.colour;
        ctx.fillRect(-0.5, -0.5, 1, 1);
      }
      ctx.restore();
      positions.forEach((not) => {
        randomizer = Math.floor(Math.random() * 13);
        if (not.distance <= 30) {
          console.log(randomizer);
          if (randomizer == 1) {
            bigger(vehicle);
          } else if (randomizer == 2) {
            shrink(vehicle);
          } else if (randomizer == 3 || randomizer == 4) {
            stop(vehicle);
          } else if (randomizer == 5 || randomizer == 6) {
            deleted(vehicle);
            //teleport(vehicle);
          } else if (randomizer == 7 || randomizer == 8 || randomizer == 9) {
            spin(vehicle);
          } else if (randomizer == 10 || randomizer == 11) {
            duplicate(vehicle);
          } else {
            teleport(vehicle);
          }
        }
      })
    }
    function stop(vehicle) {
      let poot = new Audio("fart.mp3");
      poot.volume = 0.1;
      poot.play();
      vehicle.velocity = [0, 0];
      vehicle.colour = colour_list[Math.floor(Math.random() * 7)];
    }

    function spin(vehicle) {
      vehicle.velocity = [0, 0];
      if (that == true) {
        vehicle.direction += Math.PI / 8;
      }
      //setTimeout(() => {  runAround(vehicle) }, 5000);
    }

    function bigger(vehicle) {
      vehicle.size += 1;
      //setTimeout(() => {  teleport(vehicle); }, 5000);
    }

    function shrink(vehicle) {
      vehicle.size -= 1;
      //setTimeout(() => {  teleport(vehicle); }, 5000);
    }

    function runAround(vehicle) {
      if (vehicle.position[1] <= 0) {
        vehicle.velocity[1] = vehicle.velocity[1] * -1;
        vehicle.direction = vehicle.direction * -1;
      } else if (vehicle.position[0] <= 0) {
        vehicle.velocity[0] = vehicle.velocity[0] * -1;
        vehicle.direction = vehicle.direction - 180;
      } else if (vehicle.position[0] >= window.innerWidth) {
        vehicle.velocity[0] = vehicle.velocity[0] * -1;
        vehicle.direction = vehicle.direction + 180;
      } else if (vehicle.position[1] >= window.innerHeight) {
        vehicle.velocity[1] = vehicle.velocity[1] * -1;
        vehicle.direction = vehicle.direction * -1;
      }
      vehicle.position[0] += vehicle.velocity[0];
      vehicle.position[1] += vehicle.velocity[1];
    }

    function teleport(vehicle) {
      let whoosh = new Audio("whoosh.mp3");
      whoosh.volume = 0.01;
      vehicle.velocity = [2, 2];
      vehicle.size = 50;
      vehicle.position[0] = Math.random() * window.innerWidth;
      vehicle.position[1] = Math.random() * window.innerHeight;
      whoosh.play();
    }

    function duplicate(vehicle) {
      if (vroom < 10) {
        vroom += 1;
      }
    }

    function deleted(vehicle) {
      if (vroom != 1) {
        vroom -= 1;
      }
    }
  }
}