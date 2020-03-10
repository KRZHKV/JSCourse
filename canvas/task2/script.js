const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const size = document.getElementById('range');

color.addEventListener('input', function() {
    ctx.strokeStyle = color.value
});
size.addEventListener('input', function() {
    ctx.lineWidth = size.value;
})


canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX,
          y = event.offsetY,
          mx = event.movementX,
          my = event.movementY;

    if ( event.buttons > 0 ) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }
});
