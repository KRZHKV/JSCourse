const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const angle = (degrees) => (Math.PI/180) * degrees;

ctx.beginPath();
// Синий

ctx.strokeStyle = '#005599';
ctx.arc(60, 80, 50, 0, angle(360), false);
ctx.save();
//Черный
ctx.strokeStyle = '#000000';
ctx.moveTo(230, 80);
ctx.arc(178, 80, 50, angle(360), false);
ctx.save();
//Красный
ctx.strokeStyle = '#990000';
ctx.moveTo(350, 80);
ctx.arc(300, 80, 50, angle(360), false);

//Желтый
ctx.strokeStyle = '#999900';
ctx.moveTo(170,130);
ctx.arc(120, 130, 50, 0, angle(360), false );
//Зеленый
ctx.strokeStyle = '#009900';
ctx.moveTo(290,130);
ctx.arc(240, 130, 50, 0, angle(360), false );
ctx.restore();
ctx.restore();

ctx.lineWidth = '8';


ctx.stroke();
