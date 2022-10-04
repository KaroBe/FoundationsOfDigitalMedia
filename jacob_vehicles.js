
function createvehiclesJacob(){
    let vehiclej = {
        position: [400, 400],
        velocity: [0, 0],
        size: 12,
        direction: 0,
        sensor: 0,
        speed: .5,
        shape: 0,
        owner: "Jacob",
        colour: "orange",
        history: []
    }
    vehicles.push(vehiclej)
}
createvehiclesJacob();


function processJacobsvehicles(){
    for (let vehicle of vehicles){
        if(vehicle.owner == "Jacob") {
            let vehiclesindex = vehicles.filter(function(e) {return e.owner !== "Jacob"})
            let vehiclesdistance = [];
            for (let y=0; y<vehiclesindex.length; y++){
              vehiclesindex[y].distance = (Math.sqrt((Math.abs(vehiclesindex[y].position[0] - vehicle.position[0])**2)+(Math.abs(vehiclesindex[y].position[1] - vehicle.position[1])**2)));
            }
            if(vehicle.position[0] < 20 || vehicle.position[0] > canvas.width-20){
              vehicle.position[0] += .2;
            }
            if(vehicle.position[1] < 20 || vehicle.position[1] > canvas.width-20){
              vehicle.position[1] += .2;
            }
            ctx.save();
      {
        ctx.translate(vehicle.position[0], vehicle.position[1]);
        ctx.rotate(vehicle.direction);
        ctx.scale(vehicle.size, vehicle.size);
        ctx.fillStyle = ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        ctx.beginPath();
        ctx.moveTo((Math.random()+1), (Math.random()+1));
        ctx.lineTo((Math.random()+1), (Math.random()+1));
        ctx.lineTo((Math.random()+1), (Math.random()+1));
        ctx.lineTo((Math.random()*+1), (Math.random()-2));
        ctx.lineTo((Math.random()+1), (Math.random()-2));
        ctx.lineTo((Math.random()-2), (Math.random()-2));
        ctx.lineTo((Math.random()-2), (Math.random()-2));
        ctx.lineTo((Math.random()-2), (Math.random()+1));
        ctx.lineTo((Math.random()-2), (Math.random()+1));
        ctx.fill();
      }
      ctx.restore();
      vehiclesindex.forEach((e) => {
        //insert here
        if(e.distance <= 100){
          vehicle.velocity[0] = -(e.position[0] - vehicle.position[0])/100;
          vehicle.position[0] += vehicle.velocity[0];
          vehicle.velocity[1] = -(e.position[1] - vehicle.position[1])/100;
          vehicle.position[1] += vehicle.velocity[1];
        }
        else if(e.distance > 100){
          vehicle.velocity[0] = 0;
          vehicle.velocity[1] = 0;
        }
      })
    }
  }
}


