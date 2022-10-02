// ~~ Functions ~~

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

function clear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}


function animate(){
    // Reset canvas and draw pointer
    clear();

    // Call your process...Vehicles function here
    processKarolinesVehicles();
    processJacobsvehicles()
    processCindysvehicles()

    // Initiate next frame
    window.requestAnimationFrame(animate);
}
window.animate();
  
