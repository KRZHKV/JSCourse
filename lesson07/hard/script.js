'use strict';
let body = document.querySelector('body');
const currentDate = new Date();
let options = {
	weekday: 'long'
};
const week = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота', 'Воскресенье'];
let currentDay = currentDate.toLocaleString('ru', options);
currentDay = currentDay[0].toUpperCase() + currentDay.slice(1);


week.forEach(function(elem, index ) {
	let par = document.createElement('p');
	par.textContent = elem;
	if (elem === 'Суббота' || elem === 'Воскресенье') {
		par.style.fontStyle = 'italic';
	}
	if ( elem === currentDay) {
		par.style.fontWeight = 'bold';
	}
	body.append(par);
	
	
});
