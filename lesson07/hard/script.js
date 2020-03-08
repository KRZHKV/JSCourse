'use strict';
let body = document.querySelector('body');
const currentDate = new Date();
const week = ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
console.log(currentDate.getDay() );

week.forEach(function(elem, index ) {
	let par = document.createElement('p');
	par.textContent = elem;
	if (index === 0 || index === 6) {
		par.style.fontStyle = 'italic';
	}
	if ( index === (currentDate.getDay())) {
		par.style.fontWeight = 'bold';
	}
	body.append(par);
	
	
});
